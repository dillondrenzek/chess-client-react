import "./App.scss";
import { Board } from "./app/Board";
import { BoardStage } from "./app/BoardStage";

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
      <BoardStage />
    </div>
  );
}

export default App;
