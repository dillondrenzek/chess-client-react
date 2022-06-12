import { useCallback } from "react";
import * as Chess from "../lib/chess-types";

function getBoardPositionCSS(row: number, column: number): React.CSSProperties {
  const transformX = `${column * 100}%`;
  const transformY = `${row * 100}%`;
  return {
    transform: `translate(${transformX}, ${transformY})`,
  };
}

interface SquareProps {
  square: Chess.Square;
  onMouseUp: (square: Chess.Square) => void;
}

export function Square(props: SquareProps) {
  const { square, onMouseUp } = props;

  const handleMouseUp = useCallback(() => {
    onMouseUp(square);
  }, [onMouseUp, square]);

  return (
    <div
      className={`square ${square.color === "dark" ? "dark" : "light"}`}
      style={{
        ...getBoardPositionCSS(square.row, square.column),
      }}
      data-index={square.index}
      data-rank={square.rank}
      data-file={square.file}
      onMouseUp={handleMouseUp}
    >
      <div className="label">
        {square.file}
        {square.rank}
      </div>
    </div>
  );
}
