import { useCallback, MouseEvent, useMemo, useState } from "react";
import * as Chess from "../lib/chess-types";
import * as ChessJs from "chess.js";
import { useBoardStore } from "../hooks/useBoardStore";

type MouseEventParams = {
  piece: ChessJs.Piece,
  square: Chess.Square,
}

export interface PieceProps {
  piece: ChessJs.Piece;
  square: Chess.Square;

}

export function Piece(props: PieceProps) {
  const { piece, square } = props;
  const { mousePosition } = useBoardStore();
  const [isSelected, setIsSelected] = useState(false);



  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      console.log("Mousedown (Piece):", e);
      // setIsSelected(true);
      // onMouseDown(piece, square, e);
    },
    []
  );

  const handleMouseUp = useCallback((e: MouseEvent) => {
    console.log("Mouseup (Piece)", e);
    setIsSelected(false);
  }, []);

  const boardPositionCSS = useMemo<React.CSSProperties>(() => {
    const { row, column } = square;
    const transformX = `${column * 100}%`;
    const transformY = `${row * 100}%`;

    return {
      transform: `translate(${transformX}, ${transformY})`,
    };
  }, [isSelected, square]);

  const pieceGraphicStyle = useMemo<React.CSSProperties>(() => {
    const pieceCode = `${piece.color}${piece.type}`;
    return {
      cursor: 'pointer',
      backgroundImage: `url(https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png)`,
    };
  }, [piece]);

  return (
    <div
      className="piece"
      style={{
        ...boardPositionCSS,
        ...pieceGraphicStyle,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
}
