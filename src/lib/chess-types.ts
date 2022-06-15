export enum PieceType {
  Pawn = "p",
  Rook = "r",
  Knight = "n",
  Bishop = "b",
  Queen = "q",
  King = "k",
}

export enum PieceColor {
  Black = "b",
  White = "w",
}

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export function isPiece(value: unknown): value is Piece {
  return value instanceof Object && "type" in value && "color" in value;
}

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

export interface ChessState {
  pieces: (Piece | null)[];

  turn: PieceColor;
}
