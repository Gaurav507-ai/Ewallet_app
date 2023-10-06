import React from 'react';
import { render, fireEvent, waitFor, screen, getAllByText } from '@testing-library/react';
import axios from 'axios';
import Signup from '../components/Signup';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('Signup Component', () => {
  test('Renders Signup component', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('Submit the signup form without data', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText('Submit');
    await fireEvent.click(buttonElement);
    const alertElement = screen.getByText("Email is required");
    expect(alertElement).toBeInTheDocument();
  })
  test('Submit the signup form with valid data', async () => {

    axios.post.mockResolvedValue({
      data: "registration successfully"
    });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

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
      expect(screen.getByText('Please check your email to verify your account')).toBeInTheDocument();
    });
  });

});
