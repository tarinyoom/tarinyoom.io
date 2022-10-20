import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Personal website for Adam Chiu Reynolds/i);
  expect(linkElement).toBeInTheDocument();
});
