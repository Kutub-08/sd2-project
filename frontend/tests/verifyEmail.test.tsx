import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './testUtils'
import VerifyEmailPage from '../src/pages/VerifyEmailPage'
import type { User } from '../src/types/user.types'

function unverifiedAuth() {
  return {
    auth: {
      user: {
        id: 'tenant1',
        name: 'Test Tenant',
        email: 'tenant@test.com',
        phone: '01733333333',
        role: 'TENANT' as const,
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } satisfies User,
      accessToken: 'test-access-token',
      isAuthenticated: true,
      role: 'TENANT' as const,
    },
  }
}

describe('Verify email', () => {
  it('verifies a 6-digit code and marks the user verified', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<VerifyEmailPage />, {
      preloadedState: unverifiedAuth(),
    })

    expect(screen.getByText('Verify your email')).toBeInTheDocument()

    await user.type(screen.getByLabelText('6-digit verification code'), '123456')
    await user.click(screen.getByRole('button', { name: 'Verify' }))

    await vi.waitFor(() => {
      expect(store.getState().auth.user?.isVerified).toBe(true)
    })
  })

  it('keeps the Verify button disabled until the code is complete', async () => {
    const user = userEvent.setup()
    renderWithProviders(<VerifyEmailPage />, { preloadedState: unverifiedAuth() })

    await user.type(screen.getByLabelText('6-digit verification code'), '123')
    expect(screen.getByRole('button', { name: 'Verify' })).toBeDisabled()
  })
})