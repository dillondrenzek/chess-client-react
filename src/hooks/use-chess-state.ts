import { useMemo } from "react";
import { Chess } from "chess.js";

declare global {
  interface Window {
    chess: typeof Chess;
  }
}

window.chess = Chess;

export function useChessState(fenString = "") {
  const chess = useMemo(() => new Chess(fenString || undefined), [fenString]);

  return {
    fen: chess.fen(),
    pieces: chess.board(),
    turn: chess.turn(),
    client: chess,
  };
}
