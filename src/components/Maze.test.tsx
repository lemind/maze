import React from 'react';
import { render, screen } from '@testing-library/react';
import Maze from './Maze';

test('renders Maze wrapper', () => {
  render(<Maze />);
  const mazeWrapper = screen.queryAllByTestId('mz-wrapper');
  expect(mazeWrapper).toHaveLength(1);
});