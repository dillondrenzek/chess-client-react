import { useMemo } from "react";
import { Chess } from "chess.js";

declare global {
  interface Window {
    chess: typeof Chess;
  }
}

window.chess = Chess;

const DEFAULT_FEN_STRING = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function useChessState(fenString = DEFAULT_FEN_STRING) {
  const chess = useMemo(() => new Chess(fenString || undefined), [fenString]);

  return {
    fen: chess.fen(),
    pieces: chess.board(),
    turn: chess.turn(),
    client: chess,
  };
}
