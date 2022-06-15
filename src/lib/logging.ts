import * as Chess from "./chess-types";

export function toReadableString(value: Chess.Piece) {
  if (Chess.isPiece(value)) {
    const color = (() => {
      switch (value.color) {
        case Chess.PieceColor.White:
          return "White";
        case Chess.PieceColor.Black:
          return "Black";
      }
    })();
    const type = (() => {
      switch (value.type) {
        case Chess.PieceType.Bishop:
          return "Bishop";
        case Chess.PieceType.King:
          return "King";
        case Chess.PieceType.Knight:
          return "Knight";
        case Chess.PieceType.Pawn:
          return "Pawn";
        case Chess.PieceType.Queen:
          return "Queen";
        case Chess.PieceType.Rook:
          return "Rook";
      }
    })();
    return `${color} ${type}`;
  }
}
