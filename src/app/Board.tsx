import { useCallback, useState, MouseEvent, useEffect, useRef } from "react";
import { Piece, PieceProps } from "../app/Piece";
import { Square, SquareProps } from "../app/Square";
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

  // Log the board in ascii
  //////////////////////////

  const boardInAscii = client.ascii();
  useEffect(() => {
    console.log(boardInAscii);
  }, [boardInAscii]);

  // Track mouse coordinates
  ///////////////////////////

  // TODO: variables that track the mouse's coordinates on the board

  const [mousePosX, setMousePosX] = useState<number>(0);
  const [mousePosY, setMousePosY] = useState<number>(0);

  const boardElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boardElement.current) {
      return;
    }

    // TODO: debounce this event
    const dispose = boardElement.current.addEventListener(
      "mousemove",
      (ev: globalThis.MouseEvent) => {
        const boardBoundingRect = boardElement.current?.getBoundingClientRect();

        const mouseX = ev.clientX;
        const mouseY = ev.clientY;

        const boardWidth = boardBoundingRect?.width || 0;
        const boardHeight = boardBoundingRect?.height || 0;
        const boardMinX = boardBoundingRect?.left || 0;
        const boardMinY = boardBoundingRect?.y || 0;

        const mousePosX = (mouseX - boardMinX) / boardWidth;
        const mousePosY = (mouseY - boardMinY) / boardHeight;

        setMousePosX(mousePosX);
        setMousePosY(mousePosY);

        // console.log("mouse position", mousePosX, mousePosY);

        // console.log("mouse move:", ev.clientX, ev.clientY);
        // console.log("board coords", boardBoundingRect);
      }
    );

    return dispose;
  }, []);

  // Select Active piece
  ///////////////////////

  const [activePiece, setActivePiece] = useState<ChessJs.Piece | null>(null);
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
    // if (!activePiece) {
    setActivePiece(piece);
    setActiveSquare(fromSquare);
    // }
  };

  const handleMouseDownOnPiece: PieceProps["onMouseDown"] = (
    piece,
    square,
    mouseEvent
  ) => {
    console.log("Mousedown:", piece, square, mouseEvent);
    selectPiece(piece, square, mouseEvent);
  };

  const handleMouseDownOnSquare: SquareProps["onMouseDown"] = (square, ev) => {
    setActivePiece(null);
    setActiveSquare(square);
  };

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
        {pieceRows
          .flatMap((row) => row)
          .map((piece, i) => {
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
                  onMouseDown={handleMouseDownOnSquare}
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
          Active piece: {activePiece?.color}
          {activePiece?.type}
        </div>
        <div>
          Active square: {activeSquare?.file}
          {activeSquare?.rank}
        </div>
        <div>
          Mouse position: {mousePosX} {mousePosY}
        </div>
      </div>
    </div>
  );
}
