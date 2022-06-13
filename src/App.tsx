import "./App.scss";
import { DEFAULT_FEN_STRING } from "./lib/parse-fen";
import { Board } from "./app/Board";

function App() {
  const fenString =
    new URL(window.location.href).searchParams.get("fen") ?? DEFAULT_FEN_STRING;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Board fenString={fenString} />
    </div>
  );
}

export default App;
