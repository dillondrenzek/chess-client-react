import { useCallback, useEffect, useMemo, useState } from "react";
import * as ChessJs from "chess.js";

declare global {
  interface Window {
    chess: typeof ChessJs.Chess;
  }
}

window.chess = ChessJs.Chess;

const DEFAULT_FEN_STRING =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function useChessState(inputString = DEFAULT_FEN_STRING) {
  /** Source of truth state is the FEN string */
  const [fenString, setFenString] = useState<string>(inputString);

  /** Chess.js client - designed to update with the source of truth */
  const client = useMemo(
    () => new ChessJs.Chess(fenString || undefined),
    [fenString]
  );

  const movePieceToSquare = useCallback(
    (
      fromSquare: ChessJs.Square,
      piece: { type: ChessJs.PieceSymbol; color: ChessJs.Color },
      toSquare: ChessJs.Square
    ) => {
      client.remove(fromSquare);
      client.put(piece, toSquare);
      setFenString(client.fen());
    },
    [client]
  );

  const pieces = useMemo(() => {
    return client.board();
  }, [client]);

  const ascii = useMemo(() => {
    return client.ascii();
  }, [client]);

  const turn = useMemo(() => {
    return client.turn();
  }, [client]);

  return {
    fen: fenString,
    pieces,
    turn,
    ascii,
    client,
    movePieceToSquare,
  };
}
