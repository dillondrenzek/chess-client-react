import * as Chess from "./chess-types";

export function toReadableString(value: Chess.Piece) {
  const color = (() => {
    switch (value.color) {
      case "w":
        return "White";
      case "b":
        return "Black";
      default:
        return "";
    }
  })();
  const type = (() => {
    switch (value.type) {
      case "b":
        return "Bishop";
      case "k":
        return "King";
      case "n":
        return "Knight";
      case "p":
        return "Pawn";
      case "q":
        return "Queen";
      case "r":
        return "Rook";
      default:
        return "";
    }
  })();
  return `${color} ${type}`;
}
