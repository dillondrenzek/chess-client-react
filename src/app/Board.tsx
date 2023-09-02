import { useCallback, useState, MouseEvent, useEffect } from "react";
import { Piece } from "../app/Piece";
import { Square } from "../app/Square";
import * as Chess from "../lib/chess-types";
import { useChessState } from "../hooks/use-chess-state";
import { getSquareForIndex } from "../lib/chess-fns";
import { toReadableString } from "../lib/logging";

interface BoardProps {
  fenString: string;
}

export function Board(props: BoardProps) {
  const { fenString } = props;

  // const chess = useChessGame(fenString);
  const { fen, pieces: pieceRows, turn, client } = useChessState(fenString);

  const pieces = pieceRows.flatMap((row) => {
    return row;
  });

  const [activePiece, setActivePiece] = useState<Chess.Piece | null>(null);
  const [activeSquare, setActiveSquare] = useState<Chess.Square | null>(null);

  // Log the board in ascii
  const boardInAscii = client.ascii();
  useEffect(() => {
    console.log(boardInAscii);
  }, [boardInAscii]);

  // const selectPiece = useCallback(
  //   (piece: Chess.Piece, fromSquare: Chess.Square, e: MouseEvent) => {
  //     console.log(
  //       "Select piece:",
  //       toReadableString(piece),
  //       "@",
  //       fromSquare.file + fromSquare.rank
  //     );
  //     if (!activePiece) {
  //       setActivePiece(piece);
  //       setActiveSquare(fromSquare);
  //     }
  //   },
  //   [activePiece]
  // );

  // const mouseUpOnSquare = useCallback(
  //   (square: Chess.Square) => {
  //     console.log("Mouse up:", square.file + square.rank);

  //     if (activePiece && activeSquare) {
  //       dispatch({
  //         type: "MOVE_PIECE",
  //         payload: { fromSquare: activeSquare, toSquare: square },
  //       });
  //       setActivePiece(null);
  //       setActiveSquare(null);
  //     }
  //   },
  //   [activeSquare, activePiece, dispatch]
  // );

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
                  // onMouseDown={selectPiece}
                />
              )}
              <Square
                square={square}
                // onMouseUp={mouseUpOnSquare}
              />
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
