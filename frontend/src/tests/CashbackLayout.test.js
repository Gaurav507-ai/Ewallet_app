import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CashbackLayout from '../subComponents/CashbackLayout';

jest.mock('axios');

describe('CashbackLayout Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: "1234",
          amount: 100,
          description: 'Cashback 1',
          date: '2023-09-22',
        },
        {
          id: "5678",
          amount: 200,
          description: 'Cashback 2',
          date: '2023-09-23',
        },
      ],
    });
  });

  test('Renders the cashbackLayout component', async () => {
    render(<CashbackLayout />);
    await waitFor(() => screen.getByText('Amount'));
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  test('Displays cashback records', async () => {
    render(<CashbackLayout />);
    await waitFor(() => screen.getByText('Type'));

    expect(screen.getByText('Cashback 1')).toBeInTheDocument();
    expect(screen.getByText('Cashback 2')).toBeInTheDocument();
  });
});
