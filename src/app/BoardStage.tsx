import { Layer, Rect, Text, Stage, Image, KonvaNodeEvents } from "react-konva";
import { useBoardStore } from "../hooks/useBoardStore";
import { SquareColor, SquareWithRowColumn } from "../lib/chess-types";
import { getColorForPosition, getFileForColumn, getRankForRow, getRowForRank } from "../lib/chess-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as ChessJs from "chess.js";
import Konva from "konva";
import useImage from "use-image";
import { useChessState } from "../hooks/use-chess-state";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function getSquareForLayerCoordinates(layerX: number, layerY: number) {
  const column = Math.floor(layerX / BOARD_WIDTH * 8);
  const row = Math.floor(layerY / BOARD_HEIGHT * 8);
  return `${getFileForColumn(column)}${getRankForRow(row)}`;
}

export function BoardStage() {
  const { squares } = useBoardStore();
  const {
    fen,
    pieces: pieceRows,
    turn,
    client,
  } = useChessState();

  const pieces = useMemo(() => {
    return pieceRows.flatMap((piece) => {
      return piece.map((piece) => {
        return piece ? {
          x: 50,
          y: 50,
          piece,
        } : null;
      }).filter((p) => !!p)
    }).filter((piece) => !!piece) as {
      x: number; y: number; piece: {
        square: ChessJs.Square;
        type: ChessJs.PieceSymbol;
        color: ChessJs.Color;
      };
    }[];
  }, [pieceRows]);

  const handleDragStart = useCallback<NonNullable<PieceProps['onDragStart']>>((e) => { console.log('onDragStart', e) }, []);
  const handleDragMove = useCallback<NonNullable<PieceProps['onDragMove']>>((e) => { console.log('onDragMove', e) }, []);
  const handleDragEnd = useCallback<NonNullable<PieceProps['onDragEnd']>>((e) => { if (e.type === 'dragend') { const { layerX, layerY } = (e.evt as any); console.log('onDragEnd', getSquareForLayerCoordinates(layerX, layerY)); } }, []);
  const handleClick = useCallback<NonNullable<PieceProps['onClick']>>((e) => { console.log('onClick', e) }, []);

  return (
    <Stage height={BOARD_HEIGHT} width={BOARD_WIDTH}>
      <Layer>
        {squares.map((square) => {

          const { column, row, file, rank } = square;
          const x = (BOARD_WIDTH / 8) * column;
          const y = (BOARD_HEIGHT / 8) * row;
          const fill =
            getColorForPosition(row, column) === "dark"
              ? "rgba(0,0,0,0.2)"
              : "rgba(0,0,0,0.1)";
          return (
            <>
              <Text
                text={`${file}${rank}`}
                x={x + 5}
                y={y + 5}
                preventDefault
                fill={"rgba(0,0,0,0.4)"}
              />
              <Text
                text={`(${row},${column})`}
                x={x + 5}
                y={y + 15}
                preventDefault
                fill={"rgba(0,0,0,0.4)"}
              />
              <Text
                text={`(${x},${y})`}
                x={x + 5}
                y={y + 25}
                preventDefault
                fill={"rgba(0,0,0,0.4)"}
              />
              <Rect
                height={BOARD_HEIGHT / 8}
                width={BOARD_WIDTH / 8}
                x={x}
                y={y}
                preventDefault
                fill={fill}
                onClick={handleClick}
                onDragStart={handleDragStart}
              />
            </>
          );

          // return (
          //   <Square
          //     row={square.row}
          //     column={square.column}
          //     file={square.file}
          //     rank={square.rank}
          //     onClick={() => { console.log('click') }}
          //     onDragStart={(e) => { console.log('onDragStart', e) }}
          //     onDragMove={handleDragMove}
          //     onDragEnd={handleDragEnd}
          //   />
          // )
        })}
      </Layer>
      <Layer>
        {pieces.map(({ piece, x, y }) => {
          const height = BOARD_HEIGHT / 8;
          const width = BOARD_WIDTH / 8;
          // <Piece
          //   piece={piece}
          //   x={x}
          //   y={y}
          //   onClick={handleClick}
          //   onDragStart={handleDragStart}
          //   onDragMove={handleDragMove}
          //   onDragEnd={handleDragEnd}
          // />
          return <Rect
            height={height}
            width={width}
            fill="red"
            draggable
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          // {...rest}
          />;
        }
        )}

      </Layer>


    </Stage>
  );
}

type SquareProps = {
  column: number;
  row: number;
  file: SquareWithRowColumn["file"];
  rank: SquareWithRowColumn["rank"];
};

function Square(props: SquareProps) {
  const { column, row, file, rank } = props;
  const x = (BOARD_WIDTH / 8) * column;
  const y = (BOARD_HEIGHT / 8) * row;
  const fill =
    getColorForPosition(row, column) === "dark"
      ? "rgba(0,0,0,0.2)"
      : "rgba(0,0,0,0.1)";
  return (
    <>
      {/* <Text
        text={`${file}${rank}`}
        x={x + 5}
        y={y + 5}
        preventDefault
        fill={"rgba(0,0,0,0.4)"}
      />
      <Text
        text={`(${row},${column})`}
        x={x + 5}
        y={y + 15}
        preventDefault
        fill={"rgba(0,0,0,0.4)"}
      />
      <Text
        text={`(${x},${y})`}
        x={x + 5}
        y={y + 25}
        preventDefault
        fill={"rgba(0,0,0,0.4)"}
      /> */}
      <Rect
        height={BOARD_HEIGHT / 8}
        width={BOARD_WIDTH / 8}
        x={x}
        y={y}
        preventDefault
        fill={fill}
      />
    </>
  );
}

type PieceProps = {
  piece: {
    square: ChessJs.Square;
    type: ChessJs.PieceSymbol;
    color: ChessJs.Color;
  },
  x: number,
  y: number,
  onDragStart: NonNullable<KonvaNodeEvents['onDragStart']>;
  onDragMove: NonNullable<KonvaNodeEvents['onDragMove']>;
  onDragEnd: NonNullable<KonvaNodeEvents['onDragEnd']>;
  onClick: NonNullable<KonvaNodeEvents['onClick']>;
};

function Piece(props: PieceProps) {
  const { piece, ...rest } = props;
  const pieceCode = `${piece.color}${piece.type}`;
  const imageUrl = `https://images.chesscomfiles.com/chess-themes/pieces/neo_wood/150/${pieceCode}.png`;
  const [image] = useImage(imageUrl, 'anonymous');

  const height = BOARD_HEIGHT / 8;
  const width = BOARD_WIDTH / 8;

  const handleDragStart = useCallback<NonNullable<PieceProps['onDragStart']>>((e) => { console.log('onDragStart', e) }, []);
  const handleDragMove = useCallback<NonNullable<PieceProps['onDragMove']>>((e) => { console.log('onDrageMove', e) }, []);
  const handleDragEnd = useCallback<NonNullable<PieceProps['onDragEnd']>>((e) => { console.log('onDragEnd', e); }, []);
  const handleClick = useCallback<NonNullable<PieceProps['onClick']>>((e) => { console.log('onClick', e) }, []);

  return <Rect
    height={height}
    width={width}
    fill="red"
    onClick={() => { console.log('click piece') }}
    onDragStart={(e) => { console.log('onDragStart', e) }}
    onDragMove={handleDragMove}
    onDragEnd={handleDragEnd}
  // {...rest}
  />;

  // return (image ? (
  //   <Image
  //     image={image}
  //     height={height}
  //     width={width}
  //     draggable
  //     {...rest}
  //   />
  // ) : <Rect
  //   {...rest}
  //   height={height}
  //   width={width}
  //   draggable
  //   fill="red"
  // />);
}
