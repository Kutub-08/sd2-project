import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './testUtils'
import ProfilePage from '../src/pages/ProfilePage'
import type { User } from '../src/types/user.types'

function tenantAuth() {
  return {
    auth: {
      user: {
        id: 'tenant1',
        name: 'Test Tenant',
        email: 'tenant@test.com',
        phone: '01733333333',
        role: 'TENANT' as const,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } satisfies User,
      accessToken: 'test-access-token',
      isAuthenticated: true,
      role: 'TENANT' as const,
    },
  }
}

describe('Profile', () => {
  it('edits name and syncs the Redux user', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<ProfilePage />, {
      preloadedState: tenantAuth(),
    })

    const nameInput = screen.getByLabelText('Name')
    await user.clear(nameInput)
    await user.type(nameInput, 'Renamed User')

    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    await vi.waitFor(() => {
      expect(store.getState().auth.user?.name).toBe('Renamed User')
    })
  })

  it('shows the email as read-only', () => {
    renderWithProviders(<ProfilePage />, { preloadedState: tenantAuth() })
    expect(screen.getByLabelText('Email')).toHaveValue('tenant@test.com')
  })
})