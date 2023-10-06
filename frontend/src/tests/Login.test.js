import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'; // Mock axios requests
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('Login Component', () => {
  test('Renders the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('Submit the login form without data', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const buttonElement = screen.getByText('Submit');
    await fireEvent.click(buttonElement);
    const alertElement = screen.getByText("Email is required");
    expect(alertElement).toBeInTheDocument();
  })

  test('Submit the login form with valid data', async () => {
    axios.post.mockResolvedValue({ data: { jwtToken: 'Token' } });
    axios.get.mockResolvedValue({ data: { name: 'Test' } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  })

  test('Displays error message with invalid data', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'invalid' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Credentials Invalid')).toBeInTheDocument();
    });

  })
});
