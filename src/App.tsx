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
  const splitFen = fenString.split(" ");
  const fen = {
    board: splitFen[0],
    turn: splitFen[1],
  };

  const result = [];
  let currentRow = [];

  for (let i = 0; i < fen.board.length; i++) {
    const char = fen.board.charAt(i);
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

  return {
    fenString,
    pieces: result,
    turn: fen.turn === "b" ? PieceColor.Black : PieceColor.White,
  };
}

function getPieceUrl(pieceCode: string) {
  return `https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png`;
}

function Board(props: { fenString: string }) {
  const { fenString } = props;

  const { pieces, turn } = getPiecesFromFEN(fenString);

  console.log("pieces", pieces);

  return (
    <div>
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
      <div>
        <div>
          Turn:{" "}
          {turn === PieceColor.Black
            ? "Black"
            : turn === PieceColor.White
            ? "White"
            : ""}
        </div>
        <div>FenString: {fenString}</div>
      </div>
    </div>
  );
}

function App() {
  const fenString =
    new URL(window.location.href).searchParams.get("fen") ??
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1";

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Board
        fenString={
          "r1b2rk1/ppp2ppp/1bnp2qn/6B1/1PBPP3/P4N1P/5PP1/RN1Q1RK1 w - - 5 15"
        }
      />
      <Board fenString={fenString} />
    </div>
  );
}

export default App;
