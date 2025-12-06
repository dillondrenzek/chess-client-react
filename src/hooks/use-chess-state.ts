import { useCallback, useEffect, useMemo, useState } from "react";
import * as ChessJs from "chess.js";
import { parseChessJsError } from "../lib/chess-js-error";
import { Piece, PieceWithSquare, Square } from "../lib/chess-types";

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
    (fromSquare: Square, piece: Piece, toSquare: Square) => {
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

  const pieces = useMemo<PieceWithSquare[]>(() => {
    return client.board().flatMap((piece) => {
      return piece
        .map((piece) => {
          return piece;
        })
        .filter((p) => !!p);
    }) as PieceWithSquare[];
  }, [client]);

  const capturedPieces = useMemo<Piece[]>(() => {
    const getCapturedPieces = function (
      color: ChessJs.Color,
      type: ChessJs.PieceSymbol,
      total: number
    ) {
      const uncapturedPieces = pieces.filter(
        (piece) => piece.color === color && piece.type === type
      );
      return new Array(total - uncapturedPieces.length).fill({
        color,
        type,
      });
    };

    return [
      ...getCapturedPieces("b", "p", 8),
      ...getCapturedPieces("b", "k", 1),
      ...getCapturedPieces("b", "q", 1),
      ...getCapturedPieces("b", "b", 2),
      ...getCapturedPieces("b", "n", 2),
      ...getCapturedPieces("b", "r", 2),
      ...getCapturedPieces("w", "p", 8),
      ...getCapturedPieces("w", "k", 1),
      ...getCapturedPieces("w", "q", 1),
      ...getCapturedPieces("w", "b", 2),
      ...getCapturedPieces("w", "n", 2),
      ...getCapturedPieces("w", "r", 2),
    ];
  }, [pieces]);

  const moves = useMemo(() => {
    return client.moves();
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
    capturedPieces,
    turn,
    moves,
    ascii,
    client,
    isCheck,
    isCheckmate,
    isGameOver,
    movePieceToSquare,
    reset,
  };
}
