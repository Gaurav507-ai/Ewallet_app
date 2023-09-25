import React from 'react';
import { render, fireEvent, waitFor, screen, getAllByText } from '../../test-setup';
import axios from 'axios'; 
import Signup from '../components/Signup';

jest.mock('axios');

describe('Signup Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders signup form', () => {
    render(<Signup />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('handles form submission and redirects on successful Signup', async () => {

    axios.post.mockResolvedValueOnce({
      data: "registration successfully"
    });

    jest.spyOn(axios, 'get').mockResolvedValue({ name: 'mockData'});

    render(<Signup />);
    
    fireEvent.change(screen.getByLabelText('Username'), {
        target: { value: 'test' },
      });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

});
