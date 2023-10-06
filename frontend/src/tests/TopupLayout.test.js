import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import TopupLayout from '../subComponents/TopupLayout';


jest.mock('axios');

describe('TopupLayout Component', () => {
  test('Renders TopupLayout component ', () => {
    render(<TopupLayout />);
    const element = screen.getByText('Top up')
    expect(element).toBeInTheDocument();
  });

  test('Handles form submission successfully', async () => {
    axios.post.mockResolvedValue({ data: 'Money recharge successfull' });

    render(<TopupLayout />);


    const amountInput = screen.getByLabelText('Amount');
    const topupButton = screen.getByText('Add to wallet');

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(topupButton);

    await waitFor(() => {
      expect(screen.getByText('Please wait while we are processing your request')).toBeInTheDocument();
    });
  });
});
