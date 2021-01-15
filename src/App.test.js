import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App';

const setup = () => {
  const utils = render(<App />);
  const usernameField = utils.getByLabelText('username');
  const passwordField = utils.getByLabelText('password');
  const buttonSubmit = utils.getByText(/sign up/i);
  return {
    buttonSubmit,
    passwordField,
    usernameField,
    ...utils,
  };
};

test('RegistryForm', () => {
  const { getByText } = setup();
  expect(getByText(/username/i)).toBeInTheDocument();
  expect(getByText(/password/i)).toBeInTheDocument();
  expect(getByText(/sign up/i)).toBeInTheDocument();
});

test('Validation input fields', async () => {
  const { usernameField, passwordField, buttonSubmit } = setup();
  userEvent.type(usernameField, 'barack_obama');
  expect(usernameField.value).toBe('barack_obama');
  userEvent.click(buttonSubmit);
  await waitFor(() => expect(passwordField).toHaveClass('danger'));
  userEvent.type(passwordField, '12345');
  expect(passwordField).not.toHaveClass('danger');
  userEvent.click(buttonSubmit);
  await waitFor(() => expect(passwordField).toHaveClass('danger'));
});

test('Sending data', async () => {
  const { usernameField, passwordField, buttonSubmit, getByText, getByLabelText } = setup();
  userEvent.type(usernameField, 'donald_trump');
  userEvent.type(passwordField, '123456789');
  console.log('passwordField=>>>>', passwordField.value);
  expect(buttonSubmit).toBeEnabled();
  userEvent.click(buttonSubmit);
  await waitFor(() => expect(buttonSubmit).toBeDisabled());
  // expect(buttonSubmit).toBeDisabled();
  await waitFor(() => expect(buttonSubmit).toBeEnabled());
  const updatedUsernameField = getByLabelText('username');
  expect(updatedUsernameField.value).toBe('');
  expect(getByText(/Registered success!/i, { exact: false })).toBeInTheDocument();
});
