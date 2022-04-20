import "./App.scss";

enum PieceType {
  Pawn = "p",
  Rook = "r",
  Knight = "n",
  Bishop = "b",
  Queen = "q",
  King = "k",
}

enum PieceColor {
  Black = "b",
  White = "w",
}

function getPiecesFromFEN(fenString: string) {
  const piecePositionFEN = fenString.split(" ")[0];

  const result = [];
  let currentRow = [];
  for (let i = 0; i < piecePositionFEN.length; i++) {
    const char = piecePositionFEN.charAt(i);
    const charAsNumber = parseInt(char);
    if (char === "/") {
      // found a new row
      result.push(currentRow);
      currentRow = [];
    } else if (!isNaN(charAsNumber)) {
      // found a number
      for (let j = 0; j < charAsNumber; j++) {
        currentRow.push("");
      }
    } else {
      // looking at a piece
      const color =
        char === char.toUpperCase() ? PieceColor.White : PieceColor.Black;
      const type = char.toLowerCase();

      currentRow.push(color + type);
    }
  }

  result.push(currentRow);

  return result;
}

function getPieceUrl(pieceCode: string) {
  return `https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png`;
}

function Board(props: { fenString: string }) {
  const { fenString } = props;

  const pieces = getPiecesFromFEN(fenString);

  console.log("pieces", pieces);

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

function App() {
  const fenString =
    new URL(window.location.href).searchParams.get("fen") ??
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1";

  return <Board fenString={fenString} />;
}

export default App;
