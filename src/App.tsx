import "./App.scss";
import { BoardStage } from "./app/BoardStage";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function App() {
  // const fenString = new URL(window.location.href).searchParams.get("fen");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <BoardStage height={BOARD_HEIGHT} width={BOARD_WIDTH} />
    </div>
  );
}

export default App;
