import React from 'react';
import { render, screen } from '../../test-setup';
import Landing from '../components/Landing';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/Description', () => () => <div data-testid="mockDescription" />);

describe('Landing Component', () => {
  it('renders Navbar and  Description components', () => {
    render(<Landing />);

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockDescription')).toBeInTheDocument();
  });

});
