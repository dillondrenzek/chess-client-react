import * as ChessJs from "chess.js";

/**
 * Describes a chess piece
 */
export type Piece = ChessJs.Piece;

export type PieceWithSquare = {
  square: ChessJs.Square;
  type: ChessJs.PieceSymbol;
  color: ChessJs.Color;
};

export type SquareWithRowColumn = {
  rank: BoardRank;
  file: BoardFile;
  color: SquareColor;
  row: number;
  column: number;
  index: number;
};

export type BoardFile = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Square = ChessJs.Square;

export type SquareColor = "light" | "dark";
