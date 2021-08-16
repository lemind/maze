import React from 'react';
import './App.css';
import Maze from './components/Maze';

const MAZE_SIZE = 10

function App() {
  return (
    <div className="App">
      <Maze mazeSize={MAZE_SIZE} />
    </div>
  );
}

export default App;
