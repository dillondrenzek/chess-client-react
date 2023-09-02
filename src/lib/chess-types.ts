export * from "./chess/types/piece";

export interface Square {
  row: number;
  column: number;
  index: number;
  rank: BoardRank;
  file: BoardFile;
  color: SquareColor;
}

export type BoardFile = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SquareColor = "light" | "dark";
