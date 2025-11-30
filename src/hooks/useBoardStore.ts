import { create } from "zustand";
import { combine } from "zustand/middleware";
import { getSquareForIndex } from "../lib/chess-fns";

/**
 * The store that stores the rendered state of the chess board
 */
export const useBoardStore = create(
  combine(
    {
      mousePosition: {
        x: 0,
        y: 0
      },
      pieces: [],
      squares: new Array(64).fill(null).map((_, index) => {
        return getSquareForIndex(index);
      })
    }
    ,
    (set, get) => {
      return {
        setMousePosition: (x: number, y: number) => {
          set(() => ({
            mousePosition: {
              x,
              y
            }
          }))
        }
      }
    }
  )
);