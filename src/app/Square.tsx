import { useCallback, MouseEvent, CSSProperties } from "react";
import * as Chess from "../lib/chess-types";

function getBoardPositionCSS(row: number, column: number): CSSProperties {
  const transformX = `${column * 100}%`;
  const transformY = `${row * 100}%`;
  return {
    transform: `translate(${transformX}, ${transformY})`,
  };
}

export interface SquareProps {
  square: Chess.Square;
  isActive: boolean;
  onMouseDown: (square: Chess.Square, e: MouseEvent) => void;
  // onMouseUp: (square: Chess.Square, e: MouseEvent) => void;
}

export function Square(props: SquareProps) {
  const { square, isActive, onMouseDown } = props;

  const handleMouseDownOnSquare: React.MouseEventHandler<HTMLDivElement> = (
    ev
  ) => {
    onMouseDown?.(square, ev);
  };

  // const handleMouseUp = useCallback(
  //   (e: MouseEvent) => {
  //     onMouseUp(square, e);
  //   },
  //   [onMouseUp, square]
  // );

  return (
    <div
      className={`square ${square.color === "dark" ? "dark" : "light"} ${
        isActive ? "active" : ""
      }`}
      style={{
        ...getBoardPositionCSS(square.row, square.column),
      }}
      data-index={square.index}
      data-rank={square.rank}
      data-file={square.file}
      onMouseDown={handleMouseDownOnSquare}
      // onMouseUp={handleMouseUp}
    >
      <div className="label">
        {square.file}
        {square.rank}
      </div>
    </div>
  );
}
