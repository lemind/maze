import React from 'react'
import mazeGenerator from 'generate-maze'
import classnames from 'classnames'
import './maze.css'
import MazeCursor from './MazeCursor'
import Timer from './Timer'

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

        <MazeCursor mazeScheme={maze} />
        <Timer />
      </div>
    </div>
  )
}