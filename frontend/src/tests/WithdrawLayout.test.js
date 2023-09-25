import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import WithdrawLayout from '../subComponents/WithdrawLayout';


jest.mock('axios');

describe('WithdrawLayout', () => {
  it('renders component without errors', () => {
    render(<WithdrawLayout />);
  });

  it('handles form submission successfully', async () => {
    axios.put.mockResolvedValue({ data: 'Money withdraw successful' });

    render(<WithdrawLayout />);

    const amountInput = screen.getByLabelText('Amount');
    const withdrawButton = screen.getByText('Withdraw to bank');

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(withdrawButton);

    await act(async () => {
      expect(await screen.findByText('Please wait while we are processing your request')).toBeInTheDocument();
    });

    expect(amountInput).toBeInTheDocument();
    expect(withdrawButton).toBeInTheDocument();
  });
});
