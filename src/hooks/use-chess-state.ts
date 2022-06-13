import { useState, useMemo, useReducer } from "react";
import { getPiecesFromFEN, DEFAULT_FEN_STRING } from "../lib/parse-fen";
import * as Chess from "../lib/chess-types";

type Action<T extends string, U = never> = {
  type: T;
  payload: U;
};

type ChessStateAction = Action<
  "MOVE_PIECE",
  { fromSquare: Chess.Square; toSquare: Chess.Square }
>;

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
      const { type, payload } = action;

      switch (type) {
        case "MOVE_PIECE": {
          const { pieces } = prevState;
          const { fromSquare, toSquare } = payload;
          const { index: fromIndex } = fromSquare;
          const { index: toIndex } = toSquare;
          const temp = pieces[toIndex];
          pieces[toIndex] = pieces[fromIndex];
          pieces[fromIndex] = temp;

          return {
            ...prevState,
            pieces: [...pieces],
          };
        }
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
