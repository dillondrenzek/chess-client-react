import {
  useCallback,
  useState,
  MouseEvent,
  useEffect,
  useRef,
  useMemo,
  CSSProperties,
} from "react";
import { Piece } from "../app/Piece";
import { Square } from "../app/Square";
import * as ChessJs from "chess.js";
import { useChessState } from "../hooks/use-chess-state";
import { getColumnForFile, getRowForRank } from "../lib/chess-fns";
import { useBoardStore } from "../hooks/useBoardStore";

function useMousePositionListener(
  boardElement: React.RefObject<HTMLDivElement>,
  setMousePosition: (x: number, y: number) => void
) {
  useEffect(() => {
    if (!boardElement.current) {
      return;
    }

    // TODO: debounce this event
    const dispose = boardElement.current.addEventListener(
      "mousemove",
      (ev: globalThis.MouseEvent) => {
        const boardBoundingRect = boardElement.current?.getBoundingClientRect();

        const mouseX = ev.clientX;
        const mouseY = ev.clientY;

        const boardWidth = boardBoundingRect?.width || 0;
        const boardHeight = boardBoundingRect?.height || 0;
        const boardMinX = boardBoundingRect?.x || 0;
        const boardMinY = boardBoundingRect?.y || 0;

        const mousePosX = (mouseX - boardMinX) / boardWidth;
        const mousePosY = (mouseY - boardMinY) / boardHeight;

        setMousePosition(mousePosX, mousePosY);

        // console.log("mouse position", mousePosX, mousePosY);

        // console.log("mouse move:", ev.clientX, ev.clientY);
        // console.log("board coords", boardBoundingRect);
      }
    );

    return dispose;
  }, [boardElement, setMousePosition]);
}

interface BoardProps {
  fenString: string | null;
}

export function Board(props: BoardProps) {
  const { fenString } = props;
  const {
    fen,
    pieces: pieceRows,
    turn,
    client,
  } = useChessState(fenString ?? undefined);
  const { mousePosition, setMousePosition, squares } = useBoardStore();

  // Log the board in ascii
  //////////////////////////

  const boardInAscii = client.ascii();
  useEffect(() => {
    console.log(boardInAscii);
  }, [boardInAscii]);

  // Track mouse coordinates
  ///////////////////////////

  const [selectedPiece, setSelectedPiece] = useState<{
    square: ChessJs.Square;
    type: ChessJs.PieceSymbol;
    color: ChessJs.Color;
  } | null>(null);

  // TODO: variables that track the mouse's coordinates on the board

  const pieces: {
    piece: {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    };
    positionStyle: CSSProperties;
  }[] = useMemo(() => {
    const chessJsPieces: {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    }[] = pieceRows
      .flatMap((piecesByRow) => {
        return piecesByRow;
      })
      .filter((p) => !!p) as {
      square: ChessJs.Square;
      type: ChessJs.PieceSymbol;
      color: ChessJs.Color;
    }[];
    return chessJsPieces.map((piece) => {
      const isSelected =
        selectedPiece &&
        piece.color === selectedPiece.color &&
        piece.square === selectedPiece.square &&
        piece.type === selectedPiece.type;
      const positionStyle: CSSProperties = (() => {
        const { row, column } = (() => {
          const [rank, file] = [piece.square.charAt(0), piece.square.charAt(1)];
          const row = getRowForRank(rank);
          const column = getColumnForFile(file);
          console.log(piece.square, rank, file, row, column);
          return {
            row,
            column,
          };
        })();

        if (typeof row !== "number" || typeof column !== "number") {
          return {
            display: "none",
            top: "0",
            left: "0",
            pointerEvents: "none",
          };
        }

        return {
          top: `${isSelected ? mousePosition.x : (column / 8) * 100}%`,
          left: `${isSelected ? mousePosition.y : (row / 8) * 100}%`,
        };
      })();

      return {
        piece,
        positionStyle,
      };
    });
  }, [mousePosition.x, mousePosition.y, pieceRows, selectedPiece]);
  const boardElement = useRef<HTMLDivElement>(null);

  useMousePositionListener(boardElement, setMousePosition);

  const handleMouseDown = useCallback(
    (
      piece: {
        square: ChessJs.Square;
        type: ChessJs.PieceSymbol;
        color: ChessJs.Color;
      },
      e: MouseEvent
    ) => {
      console.log("Mousedown (Piece):", piece, e);
      // setIsSelected(true);
      setSelectedPiece(piece);
      // onMouseDown(piece, square, e);
    },
    []
  );

  const handleMouseUp = useCallback(
    (
      piece: {
        square: ChessJs.Square;
        type: ChessJs.PieceSymbol;
        color: ChessJs.Color;
      },
      e: MouseEvent
    ) => {
      console.log("Mouseup (Piece)", piece, e);
      // setIsSelected(false);
    },
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="chess-board"
        ref={boardElement}
        style={{ pointerEvents: "none" }}
      >
        {pieces.map((piece) => {
          return (
            <>
              {piece && (
                <Piece
                  piece={piece.piece}
                  style={piece.positionStyle}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                />
              )}
            </>
          );
        })}
        {squares.map((square) => {
          return <Square square={square} />;
        })}
      </div>
      <div>
        <div>Turn: {turn === "b" ? "Black" : turn === "w" ? "White" : ""}</div>
        <div>FenString: {fen}</div>
        <div>
          Mouse position: {mousePosition.x} {mousePosition.y}
        </div>
      </div>
    </div>
  );
}
