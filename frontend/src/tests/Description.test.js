import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from '../subComponents/Description';

describe('Description component', () => {
  test('Renders Description component', () => {
    render(<Description />);
    const listElement = screen.getByText('User will get 10% cashback upto Rs.150 on every recharge.');
    expect(listElement).toBeInTheDocument();
  });

  test('Displays a list of features', () => {
    render(<Description />);
    const featuresList = screen.getByRole('list');
    expect(featuresList).toBeInTheDocument();

    const featureItems = screen.getAllByRole('listitem');
    expect(featureItems.length).toBe(6);
  });

  test('Displays the wallet image', () => {
    render(<Description />);
    const walletImage = screen.getByAltText('Wallet');
    expect(walletImage).toBeInTheDocument();
  });
});
