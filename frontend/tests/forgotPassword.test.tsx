import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './testUtils'
import ForgotPasswordPage from '../src/pages/ForgotPasswordPage'

describe('Forgot password', () => {
  it('shows the confirmation message after submitting an email', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ForgotPasswordPage />)

    await user.type(screen.getByLabelText('Email'), 'tenant@test.com')
    await user.click(screen.getByRole('button', { name: 'Send reset link' }))

    expect(
      await screen.findByText(/reset link is on its way/i),
    ).toBeInTheDocument()
  })

  it('links back to sign in', () => {
    renderWithProviders(<ForgotPasswordPage />)
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})