import { useCallback, useEffect, useMemo, useState } from "react";
import * as ChessJs from "chess.js";
import { parseChessJsError } from "../lib/chess-js-error";

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
      try {
        const move: ChessJs.Move = client.move({
          from: fromSquare,
          to: toSquare,
        });
        setFenString(move.after);
      } catch (e) {
        const error = parseChessJsError(e);
        console.error("Parsed error:", error);
      }
    },
    [client]
  );

  const pieces = useMemo<
    {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    }[]
  >(() => {
    return client.board().flatMap((piece) => {
      return piece
        .map((piece) => {
          return piece;
        })
        .filter((p) => !!p);
    }) as {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    }[];
  }, [client]);

  const ascii = useMemo(() => {
    return client.ascii();
  }, [client]);

  const turn = useMemo(() => {
    return client.turn();
  }, [client]);

  const isCheck = useMemo(() => {
    return client.isCheck();
  }, [client]);

  const isCheckmate = useMemo(() => {
    return client.isCheckmate();
  }, [client]);

  const isGameOver = useMemo(() => {
    return client.isGameOver();
  }, [client]);

  const reset = useCallback(() => {
    setFenString(DEFAULT_FEN_STRING);
  }, []);

  useEffect(() => {
    console.log("State update:", client.moves(), client.fen());
  }, [client]);

  return {
    fen: fenString,
    pieces,
    turn,
    ascii,
    client,
    isCheck,
    isCheckmate,
    isGameOver,
    movePieceToSquare,
    reset,
  };
}
