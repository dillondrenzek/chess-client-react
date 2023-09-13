import { buildBoard } from "./board-fns";
import { Square } from "./types/board";
import { Piece, PieceColor, PieceType } from "./types/piece";

export function createGame() {
  const board = buildBoard();
  const pieces = buildInitialPieces();

  return {
    board,
    pieces,

    getCoordinates(coordinates: string | Square): {
      square: Square;
      piece: Piece | null;
    } {
      const square = (
        typeof coordinates === "object"
          ? `${coordinates.file}${coordinates.rank}`
          : coordinates
      ).toUpperCase();
      const file = square.charAt(0);
      const rank = square.charAt(1);

      const fileIndex = "ABCDEFGH".indexOf(file);
      const rankIndex = "12345678".indexOf(rank);

      if (fileIndex === -1 || rankIndex === -1) {
        throw new Error("Invalid file or rank.");
      }

      const index = fileIndex * 8 + rankIndex;

      return {
        square: board[index],
        piece: pieces[index] || null,
      };
    },

    getOpenSquaresForPiece(piece: Piece, square: Square): Square[] {
      return [];
    },
  };
}

///////////

function buildInitialPieces(): (Piece | null)[] {
  const pieces = [
    // Rank 1
    "wr",
    "wn",
    "wb",
    "wq",
    "wk",
    "wb",
    "wn",
    "wr",
    // Rank 2
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    "wp",
    // 32 Blank
    ...Array.apply(null, Array(32)).map(() => null),
    // Rank 7
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    "bp",
    // Rank 8
    "br",
    "bn",
    "bb",
    "bq",
    "bk",
    "bb",
    "bn",
    "br",
  ];

  return pieces.map((piece) => {
    if (!piece) {
      return null;
    }
    const [color, type] = piece.split("");

    return createPiece(color as PieceColor, type as PieceType);
  });
}

function createPiece(color: PieceColor, type: PieceType): Piece {
  return {
    color,
    type,
  };
}
