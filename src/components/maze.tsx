import React from 'react'
import mazeGenerator from 'generate-maze'
import './maze.css'

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
  return <span className="Item">{mazeItem.x}_{mazeItem.y}</span>
}

export default function Maze() {
  const maze = mazeGenerator(5)

  console.log(maze)

  return (
    <div>
      <h3>maze</h3>

      {maze.map(line => {
        return <div className="Line">{
          line.map((el: any) => {
            return <MazeItem mazeItem={el} />
          })
        }</div>
      })}
    </div>
  )
}