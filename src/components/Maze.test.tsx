import React from 'react';
import { render, screen } from '@testing-library/react';
import Maze from './Maze';

const MAZE_SIZE = 10

test('renders Maze wrapper', () => {
  render(<Maze mazeSize={MAZE_SIZE} />);
  const mazeWrapper = screen.queryAllByTestId('mz-wrapper');
  expect(mazeWrapper).toHaveLength(1);
});

test('renders Maze lines', () => {
  render(<Maze mazeSize={MAZE_SIZE} />);
  const mazeLines = screen.queryAllByTestId('mz-line');
  expect(mazeLines).toHaveLength(10);
});

test('renders Maze cells', () => {
  render(<Maze mazeSize={MAZE_SIZE} />);
  const mazeItems = screen.queryAllByTestId('mz-item');
  expect(mazeItems).toHaveLength(MAZE_SIZE*MAZE_SIZE);
});
