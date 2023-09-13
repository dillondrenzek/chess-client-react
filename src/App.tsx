import "./App.scss";
import { Board } from "./app/Board";

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
      <Board fenString={fenString} />
    </div>
  );
}

export default App;
