import * as Chess from "./chess-types";
import * as ChessJs from "chess.js";

/**
 * Given an index, return the zero-indexed column number
 */
export function getColumnForIndex(index: number): number {
  return index % 8;
}

/**
 * Given an index, return the zero-indexed row number
 */
export function getRowForIndex(index: number): number {
  return Math.floor(index / 8);
}

/**
 *
 * @param index On a Chess board
 * @returns
 */
export function getSquareForIndex(index: number): Chess.Square {
  const row = getRowForIndex(index);
  const column = getColumnForIndex(index);

  return {
    index: index,
    row,
    column,
    color: index % 2 === (row % 2 === 0 ? 0 : 1) ? "dark" : "light",
    rank: (8 - row) as Chess.BoardRank,
    file: "ABCDEFGH".charAt(column) as Chess.BoardFile,
  };
}
