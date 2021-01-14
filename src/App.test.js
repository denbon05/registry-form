import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App';

test('RegistryForm', () => {
	const { asFragment, container, getByText } = render(<App />);
	// console.log('{ asFragment, container, getByText }=>', { asFragment, container, getByText });
	expect(getByText(/name/i)).toBeInTheDocument();

  // expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  // expect(screen.getByRole('textbox', { name: /address/i })).toBeInTheDocument();
  // expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
  // expect(
  //   screen.getByRole('combobox', { name: /country/i })
  // ).toBeInTheDocument();
  // expect(
  //   screen.getByRole('checkbox', { name: /accept rules/i })
  // ).toBeInTheDocument();
  // expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

  // userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // expect(asFragment()).toMatchSnapshot();
  // expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();

  // userEvent.click(screen.getByRole('button', { name: /back/i }));
  // expect(screen.getByRole('form')).toHaveFormValues({
  //   acceptRules: false,
  //   address: '',
  //   city: '',
  //   country: 'Choose',
  //   email: '',
  //   password: '',
  // });

  // userEvent.click(screen.getByRole('checkbox', { name: /accept rules/i }));
  // userEvent.type(screen.getByRole('textbox', { name: /city/i }), 'My City');
  // userEvent.type(
  //   screen.getByRole('textbox', { name: /email/i }),
  //   'test@email.com'
  // );
  // userEvent.type(screen.getByLabelText(/password/i), 'mysuperpass');
  // userEvent.selectOptions(screen.getByRole('combobox', { name: /country/i }), [
  //   'russia',
  // ]);
  // userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // expect(asFragment()).toMatchSnapshot();

  // userEvent.click(screen.getByRole('button', { name: /back/i }));

  // expect(screen.getByRole('form')).toHaveFormValues({
  //   acceptRules: true,
  //   address: '',
  //   city: 'My City',
  //   country: 'russia',
  //   email: 'test@email.com',
  //   password: 'mysuperpass',
  // });
});
