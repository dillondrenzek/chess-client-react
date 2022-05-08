import { useCallback, useState, useMemo } from "react";
import "./App.scss";

enum PieceType {
  Pawn = "p",
  Rook = "r",
  Knight = "n",
  Bishop = "b",
  Queen = "q",
  King = "k",
}

enum PieceColor {
  Black = "b",
  White = "w",
}

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface Square {
  index: number;
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  file: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  color: "light" | "dark";
}

interface ParsedFENString {
  /**
   * Input
   */
  input: string;

  pieces: PieceArray;

  turn: PieceColor;

  /**
   * Output is from a valid fen string
   */
  isValid: boolean;
}

type PieceArray = (Piece | null)[];

function movePiece(
  pieces: (Piece | null)[],
  fromSquare: Square,
  toSquare: Square
): PieceArray {
  const { index: fromIndex } = fromSquare;
  const { index: toIndex } = toSquare;
  const temp = pieces[toIndex];
  pieces[toIndex] = pieces[fromIndex];
  pieces[fromIndex] = temp;
  return pieces;
}

function getPiecesFromFEN(fenString: string): ParsedFENString {
  const splitFen = fenString.split(" ");
  const fen = {
    board: splitFen[0],
    turn: splitFen[1],
  };

  const pieces: (Piece | null)[] = [];

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
      "prnbqk".includes(charLowerCase) && (charLowerCase as PieceType);
    if (pieceType) {
      pieces.push({
        color:
          char === char.toUpperCase() ? PieceColor.White : PieceColor.Black,
        type: pieceType,
      });
    }
  }

  return {
    input: fenString,
    pieces,
    turn: fen.turn === "b" ? PieceColor.Black : PieceColor.White,
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

function getPieceGraphicCSS(piece: Piece): React.CSSProperties {
  const pieceCode = `${piece.color}${piece.type}`;
  return {
    backgroundImage: `url(https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png)`,
  };
}

function Board(props: { fenString: string }) {
  const { fenString } = props;

  const { pieces, turn } = useMemo(() => getPiecesFromFEN(fenString), []);

  console.log("pieces", pieces);

  const [activePiece, setActivePiece] = useState<Piece | null>(null);
  const [activeSquare, setActiveSquare] = useState<Square | null>(null);

  const selectPiece = useCallback(
    (piece: Piece, fromSquare: Square) => {
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
    (square: Square) => {
      console.log("mouseup", square.file, square.rank);

      if (activePiece && activeSquare) {
        movePiece(pieces, activeSquare, square);
        setActivePiece(null);
        setActiveSquare(null);
      }
    },
    [activeSquare]
  );

  return (
    <div>
      <div className="chess-board">
        {pieces.map((piece, i) => {
          const row = Math.floor(i / 8);
          const column = i % 8;

          const square: Square = {
            index: i,
            color: i % 2 === (row % 2 === 0 ? 0 : 1) ? "dark" : "light",
            rank: (row + 1) as Square["rank"],
            file: "ABCDEFGH".charAt(column) as Square["file"],
          };

          return (
            <>
              {piece && (
                <div
                  className="piece"
                  style={{
                    ...getBoardPositionCSS(row, column),
                    ...getPieceGraphicCSS(piece),
                  }}
                  onMouseDown={() => selectPiece(piece, square)}
                ></div>
              )}
              <div
                key={i}
                className={`square ${
                  square.color === "dark" ? "dark" : "light"
                }`}
                style={{
                  ...getBoardPositionCSS(row, column),
                }}
                data-index={square.index}
                data-rank={square.rank}
                data-file={square.file}
                onMouseUp={() => mouseUpOnSquare(square)}
              >
                <div className="label">
                  {square.file}
                  {square.rank}
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <div>
          Turn:{" "}
          {turn === PieceColor.Black
            ? "Black"
            : turn === PieceColor.White
            ? "White"
            : ""}
        </div>
        <div>FenString: {fenString}</div>
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
    new URL(window.location.href).searchParams.get("fen") ??
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1";

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
