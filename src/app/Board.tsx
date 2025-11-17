import { useCallback, useState, MouseEvent, useEffect, useRef, useMemo } from 'react';
import { Piece, PieceProps } from '../app/Piece';
import { Square, SquareProps, SquareState } from '../app/Square';
import * as Chess from '../lib/chess-types';
import * as ChessJs from 'chess.js';
import { useChessState } from '../hooks/use-chess-state';
import { getSquareForIndex } from '../lib/chess-fns';
import { toReadableString } from '../lib/logging';
import { useBoardStore } from '../hooks/useBoardStore';
import { render } from '@testing-library/react';

function useMousePositionListener(boardElement: React.RefObject<HTMLDivElement>, setMousePosition: (x: number, y: number) => void) {
  useEffect(() => {
    if (!boardElement.current) {
      return;
    }

    // TODO: debounce this event
    const dispose = boardElement.current.addEventListener(
      'mousemove',
      (ev: globalThis.MouseEvent) => {
        const boardBoundingRect = boardElement.current?.getBoundingClientRect();

        const mouseX = ev.clientX;
        const mouseY = ev.clientY;

        const boardWidth = boardBoundingRect?.width || 0;
        const boardHeight = boardBoundingRect?.height || 0;
        const boardMinX = boardBoundingRect?.left || 0;
        const boardMinY = boardBoundingRect?.y || 0;

        const mousePosX = (mouseX - boardMinX) / boardWidth;
        const mousePosY = (mouseY - boardMinY) / boardHeight;

        setMousePosition(
          mousePosX,
          mousePosY
        );

        // console.log("mouse position", mousePosX, mousePosY);

        // console.log("mouse move:", ev.clientX, ev.clientY);
        // console.log("board coords", boardBoundingRect);
      }
    );

    return dispose;
  }, []);
}


interface BoardProps {
  fenString: string | null;
}

export function Board(props: BoardProps) {
  const { fenString } = props;
  const { fen, pieces: pieceRows, turn, client } = useChessState(fenString);
  const { mousePosition, setMousePosition, squares } = useBoardStore();

  // Log the board in ascii
  //////////////////////////

  const boardInAscii = client.ascii();
  useEffect(() => {
    console.log(boardInAscii);
  }, [boardInAscii]);

  // Track mouse coordinates
  ///////////////////////////

  // TODO: variables that track the mouse's coordinates on the board

  const boardElement = useRef<HTMLDivElement>(null);

  useMousePositionListener(boardElement, setMousePosition);



  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        className='chess-board'
        ref={boardElement}
      >
        {pieceRows
          .flatMap((row) => row)
          .map((piece, i) => {
            const square = getSquareForIndex(i);

            return (
              <>
                {piece && (
                  <Piece
                    piece={piece}
                    square={square}
                  />
                )}
              </>
            );
          })}
        {squares.map((square) => {
          return (<Square square={square} />);
        })}
      </div>
      <div>
        <div>Turn: {turn === 'b' ? 'Black' : turn === 'w' ? 'White' : ''}</div>
        <div>FenString: {fen}</div>
        <div>
          Mouse position: {mousePosition.x} {mousePosition.y}
        </div>
      </div>
    </div>
  );
}
