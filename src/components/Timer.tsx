import React, { useState, MutableRefObject, useRef } from 'react'
import useTimer from "./hooks/useTimer"

export default function Timer() {
  const {start, stop, getTime} = useTimer()
  const [time, setTime] = useState('')
  let intervalId: MutableRefObject<any> = useRef()

  const startHandle = () => {
    start()
    intervalId.current = setInterval(() => {
      setTime(getTime())
    }, 100)
  }

  const stopHandle = () => {
    stop()
    clearInterval(intervalId.current)
  }

  return (
    <div>
      <h4>timer</h4>

      <button onClick={startHandle}>start</button>
      <button onClick={stopHandle}>stop</button>
      <div>{time}</div>
    </div>
  )
}