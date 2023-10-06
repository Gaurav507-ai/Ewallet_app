import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TransactionLayout from '../subComponents/TransactionLayout';

jest.mock('axios');

describe('TransactionLayout Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: "1234",
          amount: 100,
          description: 'Transaction 1',
          date: '2023-09-22',
          type: 'Transfer'
        },
        {
          id: "5678",
          amount: 200,
          description: 'Transaction 2',
          date: '2023-09-23',
          type: 'Transfer'
        },
      ],
    });
  });

  test('Renders TransactionLayout component', async () => {
    render(<TransactionLayout />);
    await waitFor(() => screen.getByText('Amount'));
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  test('Displays cashback records', async () => {
    render(<TransactionLayout />);
    await waitFor(() => screen.getByText('Description'));

    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 2')).toBeInTheDocument();
  });
});
