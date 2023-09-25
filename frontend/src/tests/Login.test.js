import React from 'react';
import { render, fireEvent, waitFor, screen, getAllByText } from '../../test-setup';
import axios from 'axios'; 
import Login from '../components/Login';

jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('handles form submission and redirects on successful login', async () => {

    axios.post.mockResolvedValueOnce({
      data: {
        jwtToken: 'Mock-Token',
      },
    });

    jest.spyOn(axios, 'get').mockResolvedValue({ name: 'mockData'});

    render(<Login />);
    
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
