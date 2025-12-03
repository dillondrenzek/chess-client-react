import "./App.scss";
import { Board } from "./app/Board";
import { BoardStage } from "./app/BoardStage";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function App() {
  const fenString = new URL(window.location.href).searchParams.get("fen");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {/* <Board fenString={fenString} /> */}
      <BoardStage height={BOARD_HEIGHT} width={BOARD_WIDTH} />
    </div>
  );
}

export default App;
