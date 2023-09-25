import React from 'react';
import { render, screen } from '../../test-setup';
import Navbar from '../subComponents/Navbar';

describe('Navbar', () => {
  it('renders component without errors', () => {
    render(<Navbar />);
  });

  it('displays the logo and title', () => {
    render(<Navbar />);
    const logoElement = screen.getByAltText('Wallet');
    const titleElement = screen.getByText('Ewallet');
    expect(logoElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  it('displays login and signup buttons when not authenticated', () => {
    render(<Navbar />);
    const loginButton = screen.getByText('Login');
    const signupButton = screen.getByText('Sign Up');
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
});
