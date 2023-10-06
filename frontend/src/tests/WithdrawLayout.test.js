import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import WithdrawLayout from '../subComponents/WithdrawLayout';


jest.mock('axios');

describe('WithdrawLayout Component', () => {
  test('Render Withdraw component', () => {
    render(<WithdrawLayout />);
    const element = screen.getByText('Withdraw')
    expect(element).toBeInTheDocument();
  });

  test('Handles form submission successfully', async () => {
    axios.put.mockResolvedValue({ data: 'Money withdraw successful' });

    render(<WithdrawLayout />);

    const amountInput = screen.getByLabelText('Amount');
    const withdrawButton = screen.getByText('Withdraw to bank');

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(withdrawButton);

    await waitFor(() => {
      expect(screen.getByText('Please wait while we are processing your request')).toBeInTheDocument();
    });
  });
});
