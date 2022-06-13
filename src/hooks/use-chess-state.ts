import { useState, useMemo, useReducer } from "react";
import { getPiecesFromFEN, DEFAULT_FEN_STRING } from "../lib/parse-fen";
import * as Chess from "../lib/chess-types";

type Action<T extends string, U = never> = {
  type: T;
  payload?: U;
};

type ChessStateAction = Action<"TEST", { test: boolean }>;

type ChessStateReducer = (
  prevState: Chess.ChessState,
  action: ChessStateAction
) => Chess.ChessState;

export function useChessState(fenString: string) {
  const { pieces, turn, input, isValid } = useMemo(
    () => getPiecesFromFEN(fenString),
    [fenString]
  );

  const [fen] = useState<string>(isValid ? input : DEFAULT_FEN_STRING);

  const [state, dispatch] = useReducer<ChessStateReducer>(
    (prevState, action) => {
      switch (action.type) {
        case "TEST":
          return prevState;
      }

      return prevState;
    },
    {
      pieces,
      turn,
    }
  );

  return {
    fen,
    ...state,
    dispatch,
    input,
    isValid,
  };
}
