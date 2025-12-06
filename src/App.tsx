import "./App.scss";
import { BoardStage } from "./app/BoardStage";
import { useChessState } from "./hooks/use-chess-state";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function App() {
  // const fenString = new URL(window.location.href).searchParams.get("fen");
  const {
    pieces,
    movePieceToSquare,
    ascii,
    turn,
    fen,
    isCheck,
    isCheckmate,
    isGameOver,
    reset,
  } = useChessState();

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
      <div>Is check: {isCheck ? "true" : "false"}</div>
      <div>Is checkmate: {isCheckmate ? "true" : "false"}</div>
      <div>Is game over: {isGameOver ? "true" : "false"}</div>
      <div>
        ASCII:
        <code>
          <pre>{ascii}</pre>
        </code>
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
