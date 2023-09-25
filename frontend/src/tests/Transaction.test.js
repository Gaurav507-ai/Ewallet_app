import React from 'react';
import { render, screen } from '@testing-library/react';
import Transaction from '../components/Transaction';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/TransactionLayout', () => () => <div data-testid="mockTransactionLayout" />);
jest.mock('../subComponents/Sidebar', () => () => <div data-testid="mockSidebar" />);

describe('Transaction Component', () => {
  it('renders Navbar, Sidebar, and TransactionLayout components', () => {
    render(<Transaction />);

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mockTransactionLayout')).toBeInTheDocument();
  });

});
