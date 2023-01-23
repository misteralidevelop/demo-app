import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../pages/Auth/Login/Login'
it('should have email and password field', () => {
  render(<LoginForm />)
  const emailField = screen.getByLabelText(/email/i)
  const passwordField = screen.getByLabelText(/password/i)
  expect(emailField).toBeInTheDocument()
  expect(passwordField).toBeInTheDocument()
})
it('should allow user to submit their credential', () => {
  const submit = jest.fn()
  render(<LoginForm submit={submit} />)
  const emailField = screen.getByLabelText(/email/i)
  const passwordField = screen.getByLabelText(/password/i)
  userEvent.type(emailField, 'emailAddress')
  userEvent.type(passwordField, 'vsecure')
})
