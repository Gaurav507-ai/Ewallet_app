import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from '../subComponents/Description';

describe('Description', () => {
  it('renders component without errors', () => {
    render(<Description />);
  });

  it('displays the title correctly', () => {
    render(<Description />);
    const titleElement = screen.getByText('User will get maximum 150 rupees cashback on every recharge.');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays a list of features', () => {
    render(<Description />);
    const featuresList = screen.getByRole('list');
    expect(featuresList).toBeInTheDocument();

    const featureItems = screen.getAllByRole('listitem');
    expect(featureItems.length).toBe(6);
  });

  it('displays the wallet image', () => {
    render(<Description />);
    const walletImage = screen.getByAltText('Wallet');
    expect(walletImage).toBeInTheDocument();
  });
});
