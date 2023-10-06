import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../subComponents/Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const titleElement = screen.getByText("Ewallet");
    expect(titleElement).toBeInTheDocument();
  });

  test('Displays the logo and title', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logoElement = screen.getByAltText('Wallet');
    const titleElement = screen.getByText('Ewallet');
    expect(logoElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  test('Displays login and signup buttons when not authenticated', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const loginButton = screen.getByText('Login');
    const signupButton = screen.getByText('Sign Up');
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
});
