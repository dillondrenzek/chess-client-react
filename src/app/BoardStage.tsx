import { Layer, Rect, Text, Stage } from "react-konva";
import { useBoardStore } from "../hooks/useBoardStore";
import { SquareColor, SquareWithRowColumn } from "../lib/chess-types";
import { getColorForPosition } from "../lib/chess-fns";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

export function BoardStage() {
  const { squares } = useBoardStore();

  return (
    <Stage height={BOARD_HEIGHT} width={BOARD_WIDTH}>
      <Layer>
        {squares.map((square) => (
          <Square
            row={square.row}
            column={square.column}
            file={square.file}
            rank={square.rank}
          />
        ))}
      </Layer>
    </Stage>
  );
}

type SquareProps = {
  column: number;
  row: number;
  file: SquareWithRowColumn["file"];
  rank: SquareWithRowColumn["rank"];
};

function Square(props: SquareProps) {
  const { column, row, file, rank } = props;
  const x = (BOARD_WIDTH / 8) * column;
  const y = (BOARD_HEIGHT / 8) * row;
  const fill =
    getColorForPosition(row, column) === "dark"
      ? "rgba(0,0,0,0.2)"
      : "rgba(0,0,0,0.1)";
  return (
    <>
      <Text
        text={`${file}${rank}`}
        x={x + 5}
        y={y + 5}
        fill={"rgba(0,0,0,0.4)"}
      />
      <Text
        text={`(${row},${column})`}
        x={x + 5}
        y={y + 15}
        fill={"rgba(0,0,0,0.4)"}
      />
      <Text
        text={`(${x},${y})`}
        x={x + 5}
        y={y + 25}
        fill={"rgba(0,0,0,0.4)"}
      />
      <Rect
        height={BOARD_HEIGHT / 8}
        width={BOARD_WIDTH / 8}
        x={x}
        y={y}
        fill={fill}
      />
    </>
  );
}
