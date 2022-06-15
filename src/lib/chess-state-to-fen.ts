import { getColumnForIndex, getRowForIndex } from "./chess-fns";
import { ChessState, Piece, PieceColor, PieceType } from "./chess-types";

/**
 * Converts a `Piece` into a valid FEN representation
 */
function getFenForPiece(piece: Piece) {
  const pieceTypeFenMap = {
    [PieceType.Bishop]: "b",
    [PieceType.King]: "k",
    [PieceType.Knight]: "n",
    [PieceType.Pawn]: "p",
    [PieceType.Queen]: "q",
    [PieceType.Rook]: "r",
  };
  const type = pieceTypeFenMap[piece.type];
  return piece.color === PieceColor.White ? type.toUpperCase() : type;
}

/**
 *
 * @throws TOO_MANY_PIECES
 */
export function chessStateToFen(state: ChessState): string {
  const pieces = (() => {
    let result = "";
    let blanks = 0;

    state.pieces.forEach((piece, index, arr) => {
      if (piece) {
        // found a piece
        if (blanks > 0) {
          result += blanks.toString();
        }

        // reset blank counter
        blanks = 0;

        // add piece
        result += getFenForPiece(piece);
      } else {
        // not a piece, increment blank counter
        blanks++;
      }

      // End of a line
      if (getColumnForIndex(index) === 7 && getRowForIndex(index) !== 7) {
        // if we've got blanks added up, print them out
        if (blanks > 0) {
          result += blanks.toString();
        }
        blanks = 0;

        // add end-of-line character
        result += "/";
      }
    });

    return result;
  })();
  const turn = state.turn;
  const castling = "KQkq";
  const something = "-";
  const other = "0";
  const another = "1";

  return [pieces, turn, castling, something, other, another].join(" ");
}
