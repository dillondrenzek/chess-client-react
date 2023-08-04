/**
 *
 */
export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export type PieceType =
  | "p" // Pawn
  | "r" // Rook
  | "n" // Knight
  | "b" // Bishop
  | "q" // Queen
  | "k"; // King

export type PieceColor =
  | "b" // Black
  | "w"; // White
