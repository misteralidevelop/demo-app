import React from 'react'
import { render, screen } from '@testing-library/react'

import SignupForm from '../pages/Auth/Signup/Signup'
it('should have email and password and first_name and last_name field', () => {
  render(<SignupForm />)

  const emailField = screen.getByLabelText(/email/i)
  const passwordField = screen.getByLabelText(/password/i)

  expect(emailField).toBeInTheDocument()
  expect(passwordField).toBeInTheDocument()
})
