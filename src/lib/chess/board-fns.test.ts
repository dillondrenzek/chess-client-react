import { buildBoard } from "./board-fns";

describe("buildBoard", () => {
  test("builds 64 squares", () => {
    const board = buildBoard();
    expect(board.length).toBe(64);

    board.forEach((square) => {
      expect(square).not.toBeNull();
      expect(typeof square).toBe("object");
    });
  });

  test("A1", () => {
    const board = buildBoard();
    expect(board[0]).toBeDefined();
    expect(board[0].file).toBe("A");
    expect(board[0].rank).toBe(1);
    expect(board[0].color).toBe("dark");
  });

  test("H1", () => {
    const board = buildBoard();
    expect(board[7]).toBeDefined();
    expect(board[7].file).toBe("H");
    expect(board[7].rank).toBe(1);
    expect(board[7].color).toBe("light");
  });

  test("A8", () => {
    const board = buildBoard();
    expect(board[56]).toBeDefined();
    expect(board[56].file).toBe("A");
    expect(board[56].rank).toBe(8);
    expect(board[56].color).toBe("light");
  });

  test("H8", () => {
    const board = buildBoard();
    expect(board[63]).toBeDefined();
    expect(board[63].file).toBe("H");
    expect(board[63].rank).toBe(8);
    expect(board[63].color).toBe("dark");
  });
});
