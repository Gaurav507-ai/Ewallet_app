import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

jest.mock('../subComponents/Navbar', () => () => <div data-testid="mockNavbar" />);
jest.mock('../subComponents/DashboardLayout', () => () => <div data-testid="mockDashboardLayout" />);
jest.mock('../subComponents/Sidebar', () => () => <div data-testid="mockSidebar" />);

describe('Dashboard Component', () => {
  test('Renders Navbar, Sidebar and DashboardLayout components', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('mockNavbar')).toBeInTheDocument();
    expect(screen.getByTestId('mockSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mockDashboardLayout')).toBeInTheDocument();
  });

});
