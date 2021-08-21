import React, { useState } from 'react';
import './App.css';
import Maze from './components/Maze';
import MazeSizeSetter from './components/MazeSizeSetter';

const MAZE_SIZE = 10

function App() {
  const [size, setSize] = useState(MAZE_SIZE)

  const onSizeChange = (newSize: number) => {
    setSize(newSize)
  }

  return (
    <div className="App">
      <MazeSizeSetter onChanged={onSizeChange} />
      <Maze mazeSize={size} />
    </div>
  );
}

export default App;
