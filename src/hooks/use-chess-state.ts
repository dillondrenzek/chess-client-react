import { useCallback, useState, useMemo, useReducer } from "react";
import { getPiecesFromFEN, DEFAULT_FEN_STRING } from "../lib/parse-fen";
import * as Chess from "../lib/chess-types";

type ChessStateAction = "";

type ChessStateReducer = (
  prevState: Chess.ChessState,
  action: ChessStateAction
) => Chess.ChessState;

export function useChessState(fenString: string) {
  const { pieces, turn, input, isValid } = useMemo(
    () => getPiecesFromFEN(fenString),
    [fenString]
  );

  const [fen, setFen] = useState<string>(isValid ? input : DEFAULT_FEN_STRING);

  const [state, dispatch] = useReducer<ChessStateReducer>(
    (prevState, action) => prevState,
    {
      pieces,
      turn,
    }
  );

  return {
    fen,
    pieces,
    turn,
    input,
    isValid,
  };
}
