import * as ChessJs from "chess.js";

/**
 * Describes a chess piece
 */
export type Piece = ChessJs.Piece;

/**
 * Case-insensitive chess piece type
 * @example 'p' // Pawn
 */
export type PieceType = ChessJs.PieceSymbol;

/**
 * Case-insensitive chess piece color
 * @example 'b' // Black
 */
export type PieceColor = ChessJs.Color;
