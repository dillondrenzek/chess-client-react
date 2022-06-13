import { useCallback, useState, MouseEvent } from "react";
import { Piece } from "../app/Piece";
import { Square } from "../app/Square";
import { PieceArray } from "../lib/parse-fen";
import * as Chess from "../lib/chess-types";
import { useChessState } from "../hooks/use-chess-state";

function movePiece(
  pieces: PieceArray,
  fromSquare: Chess.Square,
  toSquare: Chess.Square
): PieceArray {
  const { index: fromIndex } = fromSquare;
  const { index: toIndex } = toSquare;
  const temp = pieces[toIndex];
  pieces[toIndex] = pieces[fromIndex];
  pieces[fromIndex] = temp;
  return pieces;
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

export function Board(props: { fenString: string }) {
  const { fenString } = props;

  const { fen, pieces, turn } = useChessState(fenString);

  const [activePiece, setActivePiece] = useState<Chess.Piece | null>(null);
  const [activeSquare, setActiveSquare] = useState<Chess.Square | null>(null);

  const selectPiece = useCallback(
    (piece: Chess.Piece, fromSquare: Chess.Square, e: MouseEvent) => {
      console.log(
        "Select piece:",
        piece.color,
        piece.type,
        "@",
        fromSquare.file + fromSquare.rank
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
      console.log("Mouse up:", square.file + square.rank);

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
        <div>FenString: {fen}</div>
        <div>
          Active: {activePiece?.color}
          {activePiece?.type}
        </div>
      </div>
    </div>
  );
}