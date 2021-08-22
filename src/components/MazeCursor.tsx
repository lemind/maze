import React, { useEffect, useState } from 'react'
import './mazeCursor.css'
import { TMazeScheme } from './Maze'

type TProps = {
  mazeScheme: TMazeScheme,
  onPosChanged?: (x: number, y: number) => void
  inProgress: boolean
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

type TCursorPlace = {
  X: number,
  Y: number
}

// ToDo: make pace adjustable to a maze size
const PACE = 37
const INIT_MARGIN_Y = 9
const INIT_MARGIN_X = 9

export default function MazeCursor({mazeScheme, onPosChanged, inProgress}: TProps) {
  const [cursorPlaceX, setCursorPlaceX] = useState(0)
  const [cursorPlaceY, setCursorPlaceY] = useState(0)

  useEffect(() => {
    onPosChanged && onPosChanged(cursorPlaceX, cursorPlaceY)
  }, [cursorPlaceX, cursorPlaceY])

  useEffect(() => {
    if (!inProgress) {
      setCursorPlaceY(0)
      setCursorPlaceX(0)
    }
  }, [inProgress])

  // ToDo: moveOut
  const canMoveThisWay = (cursorPlace: TCursorPlace, direction: Direction, mazeScheme: TMazeScheme) => {
    const targetCell = mazeScheme[cursorPlace.Y][cursorPlace.X]

    let isThereBorder: boolean
    switch (direction) {
      case Direction.Left:
        isThereBorder = targetCell.left
        break;
      case Direction.Up:
        isThereBorder = targetCell.top
        break;
      case Direction.Right:
        isThereBorder = targetCell.right
        break;
      case Direction.Down:
        isThereBorder = targetCell.bottom
        break;
    }

    return !isThereBorder
  }

  const handleKeyDown = (e: any) => {
    const canMove = (direction: Direction) => canMoveThisWay({X: cursorPlaceX, Y: cursorPlaceY}, direction, mazeScheme)

    switch (e.keyCode) {
      case 37:
        canMove(Direction.Left)
          && setCursorPlaceX(cursorPlaceX - 1)
        break;
      case 38:
        canMove(Direction.Up)
          && setCursorPlaceY(cursorPlaceY - 1)
        break;
      case 39:
        canMove(Direction.Right)
          && setCursorPlaceX(cursorPlaceX + 1)
        break;
      case 40:
        canMove(Direction.Down)
          && setCursorPlaceY(cursorPlaceY + 1)
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    };
  }, [cursorPlaceX, cursorPlaceY])

  const cursorStyle = {
    top: `${INIT_MARGIN_Y + cursorPlaceY * PACE}px`,
    left: `${INIT_MARGIN_X + cursorPlaceX * PACE}px`,
  };

  return (
    <div
      className="Cursor"
      style={cursorStyle}
    />
  )
}