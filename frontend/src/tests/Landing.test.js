import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../components/Landing';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/Description', () => () => <div data-testid="mockDescription" />);

describe('Landing Component', () => {
  test('Renders Navbar and  Description components', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockDescription')).toBeInTheDocument();
  });

});
