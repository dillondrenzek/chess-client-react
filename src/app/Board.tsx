import { useCallback, useState, MouseEvent, useEffect, useRef } from "react";
import { Piece, PieceProps } from "../app/Piece";
import { Square } from "../app/Square";
import * as Chess from "../lib/chess-types";
import * as ChessJs from "chess.js";
import { useChessState } from "../hooks/use-chess-state";
import { getSquareForIndex } from "../lib/chess-fns";
import { toReadableString } from "../lib/logging";

interface BoardProps {
  fenString: string | null;
}

export function Board(props: BoardProps) {
  const { fenString } = props;
  const { fen, pieces: pieceRows, turn, client } = useChessState(fenString);

  const pieces = pieceRows.flatMap((row) => {
    return row;
  });

  // Log the board in ascii
  //////////////////////////

  const boardInAscii = client.ascii();
  useEffect(() => {
    console.log(boardInAscii);
  }, [boardInAscii]);

  // Track mouse coordinates
  ///////////////////////////

  // TODO: variables that track the mouse's coordinates on the board

  const boardElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boardElement.current) {
      return;
    }

    const dispose = boardElement.current.addEventListener(
      "mousemove",
      (ev: globalThis.MouseEvent) => {
        console.log("mouse move:", ev.clientX, ev.clientY);
        console.log(
          "board coords",
          boardElement.current?.clientTop,
          boardElement.current?.clientLeft,
          boardElement.current?.clientWidth,
          boardElement.current?.clientHeight
        );
      }
    );

    return dispose;
  }, []);

  // Select Active piece
  ///////////////////////

  const [activePiece, setActivePiece] = useState<Chess.Piece | null>(null);
  const [activeSquare, setActiveSquare] = useState<Chess.Square | null>(null);

  const selectPiece = (
    piece: ChessJs.Piece,
    fromSquare: Chess.Square,
    e: MouseEvent
  ) => {
    console.log(
      "Select piece:",
      toReadableString(piece),
      "@",
      fromSquare.file + fromSquare.rank
    );
    if (!activePiece) {
      setActivePiece(piece);
      setActiveSquare(fromSquare);
    }
  };

  const handleMouseDownOnPiece: PieceProps["onMouseDown"] = (
    piece,
    square,
    mouseEvent
  ) => {};

  const handleMouseUp = () => {};

  const handleMouseLeave = () => {};
  const handleMouseEnter = () => {};

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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        className="chess-board"
        ref={boardElement}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {pieces.map((piece, i) => {
          const square = getSquareForIndex(i);

          return (
            <>
              {piece && (
                <Piece
                  piece={piece}
                  square={square}
                  onMouseDown={handleMouseDownOnPiece}
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
        <div>Turn: {turn === "b" ? "Black" : turn === "w" ? "White" : ""}</div>
        <div>FenString: {fen}</div>
        <div>
          Active: {activePiece?.color}
          {activePiece?.type}
        </div>
      </div>
    </div>
  );
}
