import React from 'react';
import { render, screen } from '@testing-library/react';
import Cashback from '../components/Cashback';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/CashbackLayout', () => () => <div data-testid="mockCashbackLayout" />);
jest.mock('../subComponents/Sidebar', () => () => <div data-testid="mockSidebar" />);

describe('Cashback Component', () => {
  test('renders Navbar, Sidebar and CashbackLayout components', async () => {
    render(<Cashback />);
    
    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mockCashbackLayout')).toBeInTheDocument();
  });

});

