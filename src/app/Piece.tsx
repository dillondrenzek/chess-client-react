import {
  useCallback,
  MouseEvent,
  useMemo,
  useState,
  useEffect,
  MouseEventHandler,
  CSSProperties,
} from "react";
import * as Chess from "../lib/chess-types";
import * as ChessJs from "chess.js";
import { useBoardStore } from "../hooks/useBoardStore";

export interface PieceProps {
  piece: {
    square: ChessJs.Square;
    type: ChessJs.PieceSymbol;
    color: ChessJs.Color;
  };
  style: CSSProperties;
  onMouseDown: (
    piece: {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    },
    event: MouseEvent<HTMLDivElement>
  ) => void;
  onMouseUp: (
    piece: {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    },
    event: MouseEvent<HTMLDivElement>
  ) => void;
}

export function Piece(props: PieceProps) {
  const { piece, onMouseDown, onMouseUp, style } = props;

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      console.log("Mousedown (Piece):", e);
      // setIsSelected(true);
      onMouseDown(piece, e);
    },
    [piece, onMouseDown]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      console.log("Mouseup (Piece)", e);
      // setIsSelected(false);
      onMouseUp(piece, e);
    },
    [onMouseUp, piece]
  );

  const pieceGraphicStyle = useMemo<React.CSSProperties>(() => {
    const pieceCode = `${piece.color}${piece.type}`;
    return {
      cursor: "pointer",
      pointerEvents: "all",
      backgroundImage: `url(https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png)`,
    };
  }, [piece]);

  return (
    <div
      className="piece"
      style={{
        ...style,
        ...pieceGraphicStyle,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
}
