import { createGame } from "./game-fns";

describe("createGame", () => {
  test("initial state", () => {
    const game = createGame();

    expect(game.board.length).toBe(64);
    expect(game.pieces.length).toBe(64);
  });

  test("getCoordinates", () => {
    const game = createGame();

    // const a1 = game.getCoordinates('A1');
    // const b1 = game.getCoordinates('B1');

    const noPiece = game.getCoordinates("D4");
    expect(noPiece.piece).toBeNull();

    const whitePawn = game.getCoordinates("B1");
    expect(whitePawn.piece).not.toBeNull();
    expect(whitePawn.piece?.color).toBe("w");
    expect(whitePawn.piece?.type).toBe("p");
  });
});
