import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import TransferLayout from '../subComponents/TransferLayout';


jest.mock('axios');

describe('TransferLayout component', () => {
  test('Renders component', () => {
    render(<TransferLayout />);
    const element = screen.getByText('Amount');
    expect(element).toBeInTheDocument();
  });

  test('Handles form submission successfully', async () => {
    axios.post.mockResolvedValue({ data: 'Money transfer successfully' });

    render(<TransferLayout />);

    const emailInput = screen.getByLabelText("Receiver's email");
    const amountInput = screen.getByLabelText('Amount');
    const transferButton = screen.getAllByText('Transfer');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(transferButton[1]);

    await waitFor(() => {
      expect(screen.getByText('Please wait while we are processing your request')).toBeInTheDocument();
    });
  });
});
