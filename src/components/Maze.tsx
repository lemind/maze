import React from 'react'
import mazeGenerator from 'generate-maze'
import classnames from 'classnames'
import './maze.css'
import MazeCursor from './MazeCursor'

type TMazeItem = {
  bottom: boolean
  left: boolean
  right: boolean
  set: number
  top: boolean
  x: number
  y: number
}
type TProps = {
  mazeItem: TMazeItem,
}

export type TMazeScheme = TMazeItem[][]

const MAZE_SIZE = 10
const CELL_SIZE = 36 + 2 // 2 for borders

function MazeItem({mazeItem}: TProps) {
  const colorsScheme = {
    Item_bottom: mazeItem.bottom,
    Item_left: mazeItem.left,
    Item_right: mazeItem.right,
    Item_top: mazeItem.top,
    Item_start: mazeItem.x === 0 && mazeItem.y === 0,
    Item_end: mazeItem.x === MAZE_SIZE - 1 && mazeItem.y === MAZE_SIZE - 1
  }
  const itemClassName = classnames('Item', colorsScheme)
  return <span className={itemClassName}></span>
}


export default function Maze() {
  const maze = mazeGenerator(MAZE_SIZE)
  const wrapperStyle = {
    width: `${MAZE_SIZE * CELL_SIZE}px`
  }

  return (
    <div>
      <h3>Maze</h3>

      <div className="MazeWrapper" data-testid="mz-wrapper" style={wrapperStyle}>
        {maze.map(line => {
          return <div className="Line" data-testid="mz-line">{
            line.map((el: TMazeItem) => {
              return <MazeItem
                mazeItem={el}
                data-testid="mz-item"
                key={`${el.x}_${el.y}`}
              />
            })
          }</div>
        })}

        <MazeCursor mazeScheme={maze} />
      </div>
    </div>
  )
}