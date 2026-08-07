import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './testUtils'
import ReviewSection from '../src/components/reviews/ReviewSection'
import type { User } from '../src/types/user.types'
import type { RootState } from '../src/app/store'

const tenant: User = {
  id: 'tenant1',
  name: 'Test Tenant',
  email: 'tenant@test.com',
  phone: '01733333333',
  role: 'TENANT',
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const landlord: User = {
  id: 'landlord1',
  name: 'Rahim Khan',
  email: 'rahim@test.com',
  phone: '01711111111',
  role: 'LANDLORD',
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

function authState(user: User | null): Partial<RootState> {
  return {
    auth: {
      user,
      accessToken: user ? 'test-access-token' : null,
      isAuthenticated: Boolean(user),
      role: user?.role ?? null,
    },
  }
}

describe('Reviews section', () => {
  it('renders existing reviews with average rating', async () => {
    renderWithProviders(<ReviewSection listingId="l1" landlordId="landlord1" />, {
      preloadedState: authState(tenant),
    })

    expect(await screen.findByText('Excellent flat, highly recommend!')).toBeInTheDocument()
    expect(screen.getByText('Great location and value for money.')).toBeInTheDocument()
    expect(screen.getByText(/average from 2 reviews/)).toBeInTheDocument()
    expect(screen.getByText('(you)')).toBeInTheDocument()
  })

  it('shows the rating form for an authenticated user', async () => {
    renderWithProviders(<ReviewSection listingId="l1" landlordId="landlord1" />, {
      preloadedState: authState(tenant),
    })

    expect(await screen.findByText('Edit your review')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
  })

  it('hides the form for the listing owner but still shows reviews', async () => {
    renderWithProviders(<ReviewSection listingId="l1" landlordId="landlord1" />, {
      preloadedState: authState(landlord),
    })

    expect(await screen.findByText('Excellent flat, highly recommend!')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Post review' })).not.toBeInTheDocument()
    expect(screen.queryByText('Rate this listing')).not.toBeInTheDocument()
  })

  it('prompts a logged-out user to sign in', async () => {
    renderWithProviders(<ReviewSection listingId="l1" landlordId="landlord1" />, {
      preloadedState: authState(null),
    })

    expect(await screen.findByText('Excellent flat, highly recommend!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('shows empty state when a listing has no reviews', async () => {
    renderWithProviders(<ReviewSection listingId="l3" landlordId="landlord2" />, {
      preloadedState: authState(tenant),
    })

    expect(await screen.findByText('No reviews yet')).toBeInTheDocument()
    expect(screen.getByText('Be the first to rate and comment on this listing')).toBeInTheDocument()
  })

  it('posts a new review with rating and comment', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ReviewSection listingId="l3" landlordId="landlord2" />, {
      preloadedState: authState(tenant),
    })

    await screen.findByText('No reviews yet')

    await user.click(screen.getByRole('radio', { name: '5 stars' }))
    await user.type(
      screen.getByPlaceholderText('Share your experience (min 5 characters)...'),
      'Lovely apartment, very spacious!',
    )
    await user.click(screen.getByRole('button', { name: 'Post review' }))

    expect(await screen.findByText('Lovely apartment, very spacious!')).toBeInTheDocument()
    expect(screen.getByText(/average from 1 review/)).toBeInTheDocument()
  })
})
