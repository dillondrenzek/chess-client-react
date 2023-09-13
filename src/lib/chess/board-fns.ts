import { Square, SquareColor } from "./types/board";
import { BoardFile, BoardRank } from "./types/board";

const BoardFiles: BoardFile[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
const BoardRanks: BoardRank[] = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Get the index on the board (0-63) of the given square
 * @param square
 */
export function indexForSquare(square: Square): number {
  throw new Error("Not yet implemented");
}

export function buildBoard(): Square[] {
  const squares: Square[] = [];

  for (let i = 0; i < 64; i++) {
    squares.push(getSquareForIndex(i));
  }

  return squares;
}

/**
 *
 * @param index On a Chess board
 * @returns
 */
export function getSquareForIndex(index: number): Square {
  const fileIndex = index % 8;
  const rankIndex = Math.floor(index / 8);

  const square = {
    color: colorForIndex(index, rankIndex),
    rank: BoardRanks[rankIndex],
    file: BoardFiles[fileIndex],
  };

  return square;
}

function colorForIndex(index: number, rankIndex: number): SquareColor {
  return index % 2 === (rankIndex % 2 === 0 ? 0 : 1) ? "dark" : "light";
}
