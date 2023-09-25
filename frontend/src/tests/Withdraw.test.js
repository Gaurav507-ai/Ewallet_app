import React from 'react';
import { render, screen } from '@testing-library/react';
import Withdraw from '../components/Withdraw';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/WithdrawLayout', () => () => <div data-testid="mockWithdrawLayout" />);
jest.mock('../subComponents/Sidebar', () => () => <div data-testid="mockSidebar" />);

describe('Withdraw Component', () => {
  it('renders Navbar, Sidebar, and WithdrawLayout components', () => {
    render(<Withdraw />);

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mockWithdrawLayout')).toBeInTheDocument();
  });

});
