import * as ChessJs from "chess.js";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { KonvaEventObject } from "../lib/konva-types";

type KonvaImageProps = Konva.ImageConfig;

type PieceModel = {
  square: ChessJs.Square;
  type: ChessJs.PieceSymbol;
  color: ChessJs.Color;
};

export type PieceProps = {
  piece: PieceModel;
} & Omit<KonvaImageProps, "image"> & {
    onDragStart: (
      piece: PieceModel,
      konvaEvt: KonvaEventObject<"onDragStart">
    ) => void;
    onDragMove: (
      piece: PieceModel,
      konvaEvt: KonvaEventObject<"onDragMove">
    ) => void;
    onDragEnd: (
      piece: PieceModel,
      konvaEvt: KonvaEventObject<"onDragEnd">
    ) => void;
  };

export function Piece(props: PieceProps) {
  const { piece, onDragEnd, onDragMove, onDragStart, ...passthrough } = props;

  const pieceCode = `${piece.color}${piece.type}`;
  const imageUrl = `https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png`;
  const [image] = useImage(imageUrl);

  return image ? (
    <KonvaImage
      image={image}
      draggable
      {...passthrough}
      onDragStart={(e) => onDragStart(piece, e)}
      onDragMove={(e) => onDragMove(piece, e)}
      onDragEnd={(e) => onDragEnd(piece, e)}
    />
  ) : null;
}
