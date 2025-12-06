import "./App.scss";
import { BoardStage } from "./app/BoardStage";
import { useChessState } from "./hooks/use-chess-state";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function App() {
  // const fenString = new URL(window.location.href).searchParams.get("fen");
  const { pieces, movePieceToSquare, ascii, turn, fen } = useChessState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <BoardStage
        height={BOARD_HEIGHT}
        width={BOARD_WIDTH}
        pieces={pieces}
        movePieceToSquare={movePieceToSquare}
      />
      <div>Turn: {turn}</div>
      <div>Fen: {fen}</div>
      <div>
        ASCII:
        <code>
          <pre>{ascii}</pre>
        </code>
      </div>
    </div>
  );
}

export default App;
