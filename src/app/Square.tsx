import { useCallback, MouseEvent, useMemo } from "react";
import * as Chess from "../lib/chess-types";

export enum SquareState {
  None = 0,
  Active = 1,
}

export interface SquareProps {
  square: Chess.SquareWithRowColumn;
}

export function Square(props: SquareProps) {
  const { square } = props;

  const handleMouseDownOnSquare: React.MouseEventHandler<HTMLDivElement> =
    useCallback(
      (ev) => {
        console.log("Mousedown (Square):", square, ev);
      },
      [square]
    );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      console.log("Mouseup (Square):", square, e);
    },
    [square]
  );

  const squareStyle = useMemo<React.CSSProperties>(() => {
    const { row, column } = square;
    const transformX = `${(column / 8) * 100}%`;
    const transformY = `${(row / 8) * 100}%`;
    return {
      top: transformY,
      left: transformX,
    };
  }, [square]);

  return (
    <div
      className={`square ${square.color === "dark" ? "dark" : "light"}`}
      style={squareStyle}
      data-index={square.index}
      data-rank={square.rank}
      data-file={square.file}
      onMouseDown={handleMouseDownOnSquare}
      onMouseUp={handleMouseUp}
    >
      <div className="label">
        {square.file}
        {square.rank}
      </div>
    </div>
  );
}
