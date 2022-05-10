import { useCallback, useState, useMemo } from "react";
import "./App.scss";
import { Piece } from "./app/Piece";
import { Square } from "./app/Square";
import * as Chess from "./chess-types";

const DEFAULT_FEN_STRING =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function movePiece(
  pieces: Chess.PieceArray,
  fromSquare: Chess.Square,
  toSquare: Chess.Square
): Chess.PieceArray {
  const { index: fromIndex } = fromSquare;
  const { index: toIndex } = toSquare;
  const temp = pieces[toIndex];
  pieces[toIndex] = pieces[fromIndex];
  pieces[fromIndex] = temp;
  return pieces;
}

function getPiecesFromFEN(fenString: string): Chess.ParsedFENString {
  const splitFen = fenString.split(" ");
  const fen = {
    board: splitFen[0],
    turn: splitFen[1],
  };

  const pieces: Chess.PieceArray = [];

  for (let i = 0; i < fen.board.length; i++) {
    const char = fen.board.charAt(i);

    // new row
    if (char === "/") {
      continue;
    }

    // char is number
    const charAsNumber = parseInt(char);
    if (!isNaN(charAsNumber)) {
      // push consecutive blank spaces
      for (let j = 0; j < charAsNumber; j++) {
        pieces.push(null);
      }
      continue;
    }

    // found a piece
    const charLowerCase = char.toLowerCase();
    const pieceType =
      "prnbqk".includes(charLowerCase) && (charLowerCase as Chess.PieceType);
    if (pieceType) {
      pieces.push({
        color:
          char === char.toUpperCase()
            ? Chess.PieceColor.White
            : Chess.PieceColor.Black,
        type: pieceType,
      });
    }
  }

  return {
    input: fenString,
    pieces,
    turn: fen.turn === "b" ? Chess.PieceColor.Black : Chess.PieceColor.White,
    isValid: pieces.length === 64,
  };
}

function getBoardPositionCSS(row: number, column: number): React.CSSProperties {
  const transformX = `${column * 100}%`;
  const transformY = `${row * 100}%`;
  return {
    transform: `translate(${transformX}, ${transformY})`,
  };
}

function getSquareForIndex(index: number): Chess.Square {
  const row = Math.floor(index / 8);
  const column = index % 8;

  return {
    index: index,
    row,
    column,
    color: index % 2 === (row % 2 === 0 ? 0 : 1) ? "dark" : "light",
    rank: (row + 1) as Chess.BoardRank,
    file: "ABCDEFGH".charAt(column) as Chess.BoardFile,
  };
}

function Board(props: { fenString: string }) {
  const { fenString } = props;

  const [fen, setFen] = useState<string>(fenString);

  const { pieces, turn, input } = useMemo(() => getPiecesFromFEN(fen), [fen]);

  console.log("pieces", pieces);

  const [activePiece, setActivePiece] = useState<Chess.Piece | null>(null);
  const [activeSquare, setActiveSquare] = useState<Chess.Square | null>(null);

  const selectPiece = useCallback(
    (piece: Chess.Piece, fromSquare: Chess.Square) => {
      console.log(
        "mousedown",
        fromSquare.file,
        fromSquare.rank,
        "piece",
        piece.color,
        piece.type
      );
      if (!activePiece) {
        setActivePiece(piece);
        setActiveSquare(fromSquare);
      }
    },
    [activePiece]
  );

  const mouseUpOnSquare = useCallback(
    (square: Chess.Square) => {
      console.log("mouseup", square.file, square.rank);

      if (activePiece && activeSquare) {
        movePiece(pieces, activeSquare, square);
        setActivePiece(null);
        setActiveSquare(null);
      }
    },
    [activeSquare, activePiece, pieces]
  );

  return (
    <div>
      <div className="chess-board">
        {pieces.map((piece, i) => {
          const square = getSquareForIndex(i);

          return (
            <>
              {piece && (
                <Piece
                  piece={piece}
                  square={square}
                  onMouseDown={selectPiece}
                />
              )}
              <Square square={square} onMouseUp={mouseUpOnSquare} />
            </>
          );
        })}
      </div>
      <div>
        <div>
          Turn:{" "}
          {turn === Chess.PieceColor.Black
            ? "Black"
            : turn === Chess.PieceColor.White
            ? "White"
            : ""}
        </div>
        <div>FenString: {input}</div>
        <div>
          Active: {activePiece?.color}
          {activePiece?.type}
        </div>
      </div>
    </div>
  );
}

function App() {
  const fenString =
    new URL(window.location.href).searchParams.get("fen") ?? DEFAULT_FEN_STRING;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Board
        fenString={
          "r1b2rk1/ppp2ppp/1bnp2qn/6B1/1PBPP3/P4N1P/5PP1/RN1Q1RK1 w - - 5 15"
        }
      />
      <Board fenString={fenString} />
    </div>
  );
}

export default App;
