import React, { useState, useRef, MutableRefObject, useEffect } from 'react'
import mazeGenerator from 'generate-maze'
import classnames from 'classnames'
import './maze.css'
import MazeCursor from './MazeCursor'
import useTimer from './hooks/useTimer'

type TProps = {
  mazeSize: number,
}

type TMazeItem = {
  bottom: boolean
  left: boolean
  right: boolean
  set: number
  top: boolean
  x: number
  y: number
}
type TItemProps = {
  mazeItem: TMazeItem,
  mazeSize: number,
}

export type TMazeScheme = TMazeItem[][]

// ToDo: move out to consts
const CELL_SIZE = 36 + 2 // 2 for borders

function MazeItem({mazeItem, mazeSize}: TItemProps) {
  const colorsScheme = {
    Item_bottom: mazeItem.bottom,
    Item_left: mazeItem.left,
    Item_right: mazeItem.right,
    Item_top: mazeItem.top,
    Item_start: mazeItem.x === 0 && mazeItem.y === 0,
    Item_end: mazeItem.x === mazeSize - 1 && mazeItem.y === mazeSize - 1
  }
  const itemClassName = classnames('Item', colorsScheme)
  return <span className={itemClassName} data-testid="mz-item" />
}


export default function Maze({mazeSize}: TProps) {
  const maze = mazeGenerator(mazeSize)
  const wrapperStyle = {
    width: `${mazeSize * CELL_SIZE}px`
  }
  const {start, stop, getTime} = useTimer()
  const [time, setTime] = useState('')
  let intervalId: MutableRefObject<NodeJS.Timeout | undefined> = useRef()
  const [inProgress, setInProgress] = useState(false)

  const onCursorPosChanged = (x: number, y: number) => {

    if ((x === 1 || y === 1) && !intervalId.current) {
      startHandle()
    }

    if (x === mazeSize - 1 && y === mazeSize - 1) {
      stopHandle()
    }
  }

  const startHandle = () => {
    setInProgress(true)
    start()
    intervalId.current = setInterval(() => {
      setTime(getTime())
    }, 900)
  }

  const stopHandle = () => {
    stop()
    intervalId.current && clearInterval(intervalId.current)
    intervalId.current = undefined
  }

  const resetHandle = () => {
    stopHandle()
    setTime('')
    // ToDo: resonsider too hacky
    setInProgress(true)
    setInProgress(false)
  }

  useEffect(() => {
    resetHandle()
  }, [mazeSize])

  return (
    <div>
      <h3>Maze</h3>

      <div className="MazeWrapper" data-testid="mz-wrapper" style={wrapperStyle}>
        {maze.map(line => {
          return <div className="Line" key={line[0].y} data-testid="mz-line">{
            line.map((el: TMazeItem) => {
              return <MazeItem
                mazeItem={el}
                mazeSize={mazeSize}
                key={`${el.x}_${el.y}`}
              />
            })
          }</div>
        })}

        <MazeCursor
          mazeScheme={maze}
          onPosChanged={onCursorPosChanged}
          inProgress={inProgress}
        />

        <div className="MazePanel">
          <div className="MazeTimer">{time}</div>
          <button onClick={resetHandle}>Reset</button>
        </div>
      </div>
    </div>
  )
}