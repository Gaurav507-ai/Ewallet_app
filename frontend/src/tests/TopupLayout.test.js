import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios'; 
import TopupLayout from '../subComponents/TopupLayout';


jest.mock('axios');

describe('TopupLayout', () => {
  it('renders component without errors', () => {
    render(<TopupLayout />);
  });

  it('handles form submission successfully', async () => {
    axios.put.mockResolvedValue({ data: 'Money recharge successfull' });

    render(<TopupLayout />);


    const amountInput = screen.getByLabelText('Amount');
    const topupButton = screen.getByText('Add to wallet');

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(topupButton);

    await act(async () => {
      expect(await screen.findByText('Please wait while we are processing your request')).toBeInTheDocument();
    });
    expect(amountInput).toBeInTheDocument();
    expect(topupButton).toBeInTheDocument();
  });
});
