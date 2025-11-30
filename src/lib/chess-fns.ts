import * as Chess from "./chess-types";

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
 * @param file string representing a file (case-insensitve)
 * @returns Zero-indexed value for the column
 */
export function getColumnForFile(file: string): number | null {
  const index = "ABCDEFGH".indexOf(file.toUpperCase());

  return index >= 0 ? index : null;
}

export function getFileForColumn(column: number): Chess.BoardFile {
  return "ABCDEFGH".charAt(column) as Chess.BoardFile;
}

export function getRankForRow(row: number): Chess.BoardRank {
  return (8 - row) as Chess.BoardRank;
}

/**
 * Returns a zero-indexed value for the row given a string rank like "1" or "8"
 * @param rank
 */
export function getRowForRank(rank: string): number | null {
  const value = parseInt(rank);
  if (value >= 1 && value <= 8) {
    return 8 - value;
  }

  return null;
}

export function getColorForPosition(
  row: number,
  column: number
): Chess.SquareColor {
  return column % 2 === (row % 2 === 0 ? 1 : 0) ? "dark" : "light";
}

/**
 *
 * @param index On a Chess board
 * @returns
 */
export function getSquareForIndex(index: number): Chess.SquareWithRowColumn {
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
