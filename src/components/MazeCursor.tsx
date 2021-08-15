import React, { useEffect, useState } from 'react'
import './mazeCursor.css'

type TProps = {
  bla: boolean,
}

// ToDo: make pace very precise
const PACE = 37
const INIT_MARGIN_Y = 9
const INIT_MARGIN_X = 13

export default function MazeCursor({bla}: TProps) {
  const [cursorPlaceX, setCursorPlaceX] = useState(0)
  const [cursorPlaceY, setCursorPlaceY] = useState(0)

  const handleKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 37:
        console.log('left');
        setCursorPlaceX(cursorPlaceX - PACE)
        break;
      case 38:
        console.log('up');
        setCursorPlaceY(cursorPlaceY - PACE)
        break;
      case 39:
        console.log('right', cursorPlaceX, cursorPlaceX + PACE);
        setCursorPlaceX(cursorPlaceX + PACE)
        break;
      case 40:
        console.log('down', cursorPlaceY, cursorPlaceY + PACE);
        setCursorPlaceY(cursorPlaceY + PACE)

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
    top: `${INIT_MARGIN_Y + cursorPlaceY}px`,
    left: `${INIT_MARGIN_X + cursorPlaceX}px`,
  };

  return (
    <div
      className="Cursor"
      style={cursorStyle}
    />
  )
}