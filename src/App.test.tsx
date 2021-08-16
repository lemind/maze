import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders maze title', () => {
  render(<App />);
  const title = screen.getByText(/Maze/i);
  expect(title).toBeInTheDocument();
});
