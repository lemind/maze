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

function MazeItem({mazeItem}: TProps) {
  const bordersScheme = {
    Item_bottom: mazeItem.bottom,
    Item_left: mazeItem.left,
    Item_right: mazeItem.right,
    Item_top: mazeItem.top,
  }
  const itemClassName = classnames('Item', bordersScheme)
  return <span className={itemClassName}></span>
}

const MAZE_SIZE = 10

export default function Maze() {
  const maze = mazeGenerator(MAZE_SIZE)

  return (
    <div>
      <h3>Maze</h3>

      <div className="MazeWrapper">
        {maze.map(line => {
          return <div className="Line">{
            line.map((el: any) => {
              return <MazeItem mazeItem={el} />
            })
          }</div>
        })}

        <MazeCursor bla />
      </div>
    </div>
  )
}