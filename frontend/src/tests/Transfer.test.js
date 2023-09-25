import React from 'react';
import { render, screen } from '@testing-library/react';
import Transfer from '../components/Transfer';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/TransferLayout', () => () => <div data-testid="mockTransferLayout" />);
jest.mock('../subComponents/Sidebar', () => () => <div data-testid="mockSidebar" />);

describe('Transfer Component', () => {
  it('renders Navbar, Sidebar, and TransferLayout components', () => {
    render(<Transfer />);

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mockTransferLayout')).toBeInTheDocument();
  });

});
