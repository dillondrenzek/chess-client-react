import * as Chess from "./chess-types";

export type PieceArray = (Chess.Piece | null)[];

export interface ParsedFENString {
  /**
   * Input
   */
  input: string;

  pieces: PieceArray;

  turn: Chess.PieceColor;

  /**
   * Output is from a valid fen string
   */
  isValid: boolean;
}

export function getPiecesFromFEN(fenString: string): ParsedFENString {
  const splitFen = fenString.split(" ");
  const fen = {
    board: splitFen[0],
    turn: splitFen[1],
  };

  const pieces: PieceArray = [];

  for (let i = 0; i < fen.board.length; i++) {
    const char = fen.board.charAt(i);

    // new row
    if (char === "/") {
      continue;
    }

    // char is number
    const charAsNumber = parseInt(char);
    if (!isNaN(charAsNumber)) {
      // push consecutive blank spaces
      for (let j = 0; j < charAsNumber; j++) {
        pieces.push(null);
      }
      continue;
    }

    // found a piece
    const charLowerCase = char.toLowerCase();
    const pieceType =
      "prnbqk".includes(charLowerCase) && (charLowerCase as Chess.PieceType);
    if (pieceType) {
      pieces.push({
        color:
          char === char.toUpperCase()
            ? Chess.PieceColor.White
            : Chess.PieceColor.Black,
        type: pieceType,
      });
    }
  }

  return {
    input: fenString,
    pieces,
    turn: fen.turn === "b" ? Chess.PieceColor.Black : Chess.PieceColor.White,
    isValid: pieces.length === 64,
  };
}
