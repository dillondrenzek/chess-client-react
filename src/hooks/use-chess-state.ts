import { useState, useMemo, useReducer, useEffect } from "react";
import { getPiecesFromFEN, DEFAULT_FEN_STRING } from "../lib/parse-fen";
import * as Chess from "../lib/chess-types";
import { chessStateToFen } from "../lib/chess-state-to-fen";

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

  const [fen, setFen] = useState<string>(isValid ? input : DEFAULT_FEN_STRING);

  const [state, dispatch] = useReducer<ChessStateReducer>(
    (prevState, action) => {
      const { type, payload } = action;
      const { pieces } = prevState;

      switch (type) {
        case "MOVE_PIECE": {
          const { fromSquare, toSquare } = payload;
          const { index: fromIndex } = fromSquare;
          const { index: toIndex } = toSquare;

          const newPieces = [...pieces];
          newPieces[fromIndex] = null;
          newPieces[toIndex] = pieces[fromIndex];

          return {
            ...prevState,
            pieces: newPieces,
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

  // Update FEN string
  useEffect(() => {
    const newFen = chessStateToFen(state);
    setFen(newFen);
  }, [state]);

  return {
    fen,
    ...state,
    dispatch,
    input,
    isValid,
  };
}
