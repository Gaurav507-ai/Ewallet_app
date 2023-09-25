import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Landing component', () => {
  render(<App />);
  const landingElement = screen.getByText('Users can download their detailed transaction history.'); // Replace with actual landing page text
  expect(landingElement).toBeInTheDocument();
});



// Add more tests for other components similarly
