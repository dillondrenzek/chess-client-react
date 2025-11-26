import { Circle, Layer, Stage } from "react-konva";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

export function BoardStage() {
  return (
    <Stage height={BOARD_HEIGHT} width={BOARD_WIDTH}>
      <Layer>
        <Circle
          x={BOARD_WIDTH / 2}
          y={BOARD_HEIGHT / 2}
          radius={50}
          fill="red"
        />
      </Layer>
    </Stage>
  );
}
