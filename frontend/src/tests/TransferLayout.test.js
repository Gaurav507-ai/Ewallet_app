import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios'; 
import TransferLayout from '../subComponents/TransferLayout';


jest.mock('axios');

describe('TransferLayout', () => {
  it('renders component without errors', () => {
    render(<TransferLayout />);
  });

  it('handles form submission successfully', async () => {
    axios.post.mockResolvedValue({ data: 'Money transfer successfully' });

    render(<TransferLayout />);

    const emailInput = screen.getByLabelText("Receiver's email");
    const amountInput = screen.getByLabelText('Amount');
    const transferButton = screen.getAllByText('Transfer');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(transferButton[1]);

    await act(async () => {
      expect(await screen.findByText('Please wait while we are processing your request')).toBeInTheDocument();
    });
    expect(emailInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(transferButton[1]).toBeInTheDocument();
  });
});
