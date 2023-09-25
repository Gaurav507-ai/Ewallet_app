import React from 'react';
import { render, screen, waitFor } from '../../test-setup';
import DashboardLayout from '../subComponents/DashboardLayout';
import axios from 'axios';

jest.mock('axios');

describe('DashboardLayout', () => {
    it('renders wallet balance', async () => {
        const mockData = {
            walletBalance: 1000,
            income: 500,
            expenses: 300,
        };
        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

        render(<DashboardLayout />);
        const walletBalanceElement = screen.getByText('Wallet Balance')

        expect(walletBalanceElement).toBeInTheDocument();
    });

});
