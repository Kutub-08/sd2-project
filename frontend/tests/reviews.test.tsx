import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './testUtils'
import ReviewsSection from '../src/components/reviews/ReviewsSection'
import type { User } from '../src/types/user.types'

class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', MockObserver)
vi.stubGlobal('ResizeObserver', MockObserver)

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

describe('ReviewsSection', () => {
  it('shows the verdict board and tenant reviews', async () => {
    renderWithProviders(<ReviewsSection listingId="l1" />, { preloadedState: tenantAuth() })

    expect(await screen.findByText('4.5')).toBeInTheDocument()
    expect(screen.getByText(/2 tenants weighed in/)).toBeInTheDocument()
    expect(screen.getByText('Quiet block and the landlord keeps his word.')).toBeInTheDocument()
    expect(screen.getByText('Good value. The monsoon rains leak a little.')).toBeInTheDocument()
  })

  it('does not let a tenant who already reviewed post again', async () => {
    renderWithProviders(<ReviewsSection listingId="l1" />, { preloadedState: tenantAuth() })

    await screen.findByText('4.5')
    expect(screen.getByText(/already left a verdict/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Post review' })).not.toBeInTheDocument()
  })

  it('lets a tenant post a review that shows up in the list', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ReviewsSection listingId="l3" />, { preloadedState: tenantAuth() })

    expect(await screen.findByText(/No tenant has judged this flat yet/)).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: '4 stars' }))
    await user.type(screen.getByLabelText('Your take'), 'Good build quality, helpful landlord.')
    await user.click(screen.getByRole('button', { name: 'Post review' }))

    expect(await screen.findByText('Good build quality, helpful landlord.')).toBeInTheDocument()
    expect(await screen.findByText(/already left a verdict/)).toBeInTheDocument()
  })
})