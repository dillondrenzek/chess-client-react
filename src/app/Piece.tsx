import { useCallback } from "react";
import * as Chess from "../chess-types";

function getPieceGraphicCSS(piece: Chess.Piece): React.CSSProperties {
  const pieceCode = `${piece.color}${piece.type}`;
  return {
    backgroundImage: `url(https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png)`,
  };
}

function getBoardPositionCSS(row: number, column: number): React.CSSProperties {
  const transformX = `${column * 100}%`;
  const transformY = `${row * 100}%`;
  return {
    transform: `translate(${transformX}, ${transformY})`,
  };
}

interface PieceProps {
  piece: Chess.Piece;
  square: Chess.Square;
  onMouseDown: (piece: Chess.Piece, square: Chess.Square) => void;
}

export function Piece(props: PieceProps) {
  const { piece, square, onMouseDown } = props;

  const { row, column } = square;

  const handleMouseDown = useCallback(() => {
    onMouseDown(piece, square);
  }, [onMouseDown, piece, square]);

  return (
    <div
      className="piece"
      style={{
        ...getBoardPositionCSS(row, column),
        ...getPieceGraphicCSS(piece),
      }}
      onMouseDown={handleMouseDown}
    ></div>
  );
}
