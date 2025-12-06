import { Layer, Rect, Text, Stage, KonvaNodeEvents } from "react-konva";
import { useBoardStore } from "../hooks/useBoardStore";
import {
  getColorForPosition,
  getFileForColumn,
  getPositionForSquare,
  getRankForRow,
} from "../lib/chess-fns";
import React, { useCallback, useMemo } from "react";
import { Piece } from "./Piece";
import * as Chess from "../lib/chess-types";

function getSquareForLayerCoordinates(
  layerX: number,
  layerY: number,
  boardWidth: number,
  boardHeight: number
): Chess.Square {
  const column = Math.floor((layerX / boardWidth) * 8);
  const row = Math.floor((layerY / boardHeight) * 8);
  return `${getFileForColumn(column)}${getRankForRow(row)}` as Chess.Square;
}

export type BoardStageProps = {
  height: number;
  width: number;
  pieces: Chess.PieceWithSquare[];
  movePieceToSquare: (
    fromSquare: Chess.Square,
    piece: Chess.Piece,
    toSquare: Chess.Square
  ) => void;
};

export function BoardStage(props: BoardStageProps) {
  const {
    height: boardHeight,
    width: boardWidth,
    pieces,
    movePieceToSquare,
  } = props;
  const { squares } = useBoardStore();

  const handleDragStart = useCallback<NonNullable<PieceProps["onDragStart"]>>(
    (e, kEvt) => {
      // console.log("onDragStart", e, kEvt);
    },
    []
  );
  const handleDragMove = useCallback<NonNullable<PieceProps["onDragMove"]>>(
    (e, kEvt) => {
      // const { layerX, layerY } = kEvt.evt as any;
      // console.log("onDragMove", e, layerX, layerY);
    },
    []
  );
  const handleDragEnd = useCallback<NonNullable<PieceProps["onDragEnd"]>>(
    (e, kEvt) => {
      if (kEvt.type === "dragend") {
        const { layerX, layerY } = kEvt.evt as any;
        const newSquare = getSquareForLayerCoordinates(
          layerX,
          layerY,
          boardWidth,
          boardHeight
        );

        movePieceToSquare(
          e.square,
          { type: e.type, color: e.color },
          newSquare.toLowerCase() as Chess.Square
        );
      }
    },
    [boardHeight, boardWidth, movePieceToSquare]
  );
  const handleClick = useCallback<NonNullable<PieceProps["onClick"]>>((e) => {
    console.log("onClick", e);
  }, []);

  const positionedPieces = useMemo(() => {
    const height = boardHeight / 8;
    const width = boardWidth / 8;
    return pieces
      .map((piece) => {
        return piece
          ? {
              ...getPositionForSquare(piece.square, boardWidth, boardHeight),
              pieceHeight: height,
              pieceWidth: width,
              piece,
            }
          : null;
      })
      .filter((p) => !!p) as {
      x: number;
      y: number;
      pieceHeight: number;
      pieceWidth: number;
      piece: Chess.PieceWithSquare;
    }[];
  }, [pieces, boardHeight, boardWidth]);

  const positionedSquares = useMemo(() => {
    return squares.map((square) => {
      const { column, row } = square;
      const boardFactorX = boardWidth / 8;
      const boardFactorY = boardHeight / 8;
      return {
        ...square,
        squareWidth: boardWidth / 8,
        squareHeight: boardHeight / 8,
        x: boardFactorX * column,
        y: boardFactorY * row,
      };
    });
  }, [squares, boardHeight, boardWidth]);

  return (
    <Stage height={boardHeight} width={boardWidth}>
      <Layer>
        {positionedSquares.map(
          ({ column, file, rank, row, x, y, squareHeight, squareWidth }) => {
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
                {/* <Text
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
                  height={squareHeight}
                  width={squareWidth}
                  x={x}
                  y={y}
                  preventDefault
                  fill={fill}
                  onClick={handleClick}
                />
              </>
            );
          }
        )}
      </Layer>
      <Layer>
        {positionedPieces.map(({ piece, x, y, pieceHeight, pieceWidth }) => {
          return (
            <React.Fragment key={piece.color + piece.square + piece.type}>
              <Piece
                height={pieceHeight}
                width={pieceWidth}
                x={x}
                y={y}
                piece={piece}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
              />
              <Rect />
              <Text
                text={`${piece.square.toUpperCase()}`}
                x={x + 5}
                y={y + 5}
                preventDefault
                fill={"black"}
              />
              <Text
                text={`${piece.color}${piece.type}`}
                x={x + 5}
                y={y + 15}
                preventDefault
                fill={"black"}
              />
              {/* 
              <Text
                text={`${x},${y}`}
                x={x + 5}
                y={y + 25}
                preventDefault
                fill={"black"}
              /> */}
            </React.Fragment>
          );
        })}
      </Layer>
    </Stage>
  );
}

type PieceProps = {
  piece: Chess.PieceWithSquare;
  x: number;
  y: number;
  onDragStart: (
    piece: Chess.PieceWithSquare,
    konvaEvt: Parameters<NonNullable<KonvaNodeEvents["onDragStart"]>>[0]
  ) => void;
  onDragMove: (
    piece: Chess.PieceWithSquare,
    konvaEvt: Parameters<NonNullable<KonvaNodeEvents["onDragMove"]>>[0]
  ) => void;
  onDragEnd: (
    piece: Chess.PieceWithSquare,
    konvaEvt: Parameters<NonNullable<KonvaNodeEvents["onDragEnd"]>>[0]
  ) => void;
  onClick: NonNullable<KonvaNodeEvents["onClick"]>;
};
