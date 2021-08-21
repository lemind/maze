import React, { useState, useEffect } from 'react'
import './mazeSizeSetter.css'

type TProps = {
  onChanged: (size: number) => void,
}

const INIT_MAZE_SIZE = 10
const MIN_SIZE = 3
const MAX_SIZE = 20

export default function MazeSizeSetter(props: TProps) {
  const [size, setSize] = useState(INIT_MAZE_SIZE)

  useEffect(() => {
    props.onChanged(size)
  }, [size])

  const decreaseHandle = () => {
    if (size > MIN_SIZE) {
      setSize(size - 1)
    }
  }

  const increaseHandle = () => {
    if (size < MAX_SIZE) {
      setSize(size + 1)
    }
  }

  return (
    <div className="SizeSetterWrapper">
      <button onClick={decreaseHandle} className="SizeSetterBtn">-</button>
      <div>{size}</div>
      <button onClick={increaseHandle} className="SizeSetterBtn">+</button>
    </div>
  )
}