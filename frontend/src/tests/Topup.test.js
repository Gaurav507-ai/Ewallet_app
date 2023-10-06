import React from 'react';
import { render, screen } from '@testing-library/react';
import Topup from '../components/Topup';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/TopupLayout', () => () => <div data-testid="mockTopupLayout" />);
jest.mock('../subComponents/Sidebar', () => () => <div data-testid="mockSidebar" />);

describe('Topup Component', () => {
  test('Renders Navbar, Sidebar, and TopupLayout components', () => {
    render(<Topup />);

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mockTopupLayout')).toBeInTheDocument();
  });

});
