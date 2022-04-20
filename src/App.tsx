import "./App.scss";

function getPieceUrl(pieceCode: string) {
  return `https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png`;
}

function App() {
  const pieces = [
    "bR bN bB bQ bK bB bN bR".toLowerCase().split(" "),
    "bp ".repeat(8).split(" "),
    "".split(" "),
    "".split(" "),
    "".split(" "),
    "".split(" "),
    "wp ".repeat(8).split(" "),
    "wR wN wB wQ wK wB wN wR".toLowerCase().split(" "),
  ];

  return (
    <div className="chess-board">
      {[...Array(64)].map((e, i) => {
        const row = Math.floor(i / 8);
        const column = i % 8;
        const rank = row + 1;
        const file = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(column);
        const pieceCode = pieces[row][column];

        return (
          <div
            key={i}
            className={`square ${
              i % 2 === (row % 2 === 0 ? 0 : 1) ? "even" : "odd"
            }`}
            data-index={i}
            data-rank={rank}
            data-file={file}
          >
            {pieceCode && (
              <div
                className="piece"
                style={{
                  backgroundImage: `url(${getPieceUrl(pieceCode)})`,
                }}
              ></div>
            )}
            <div className="label">
              {file}
              {rank}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
