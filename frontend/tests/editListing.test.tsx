import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import authReducer from '../src/features/auth/authSlice'
import uiReducer from '../src/features/ui/uiSlice'
import * as listingsApi from '../src/api/listings.api'
import EditListingPage from '../src/pages/landlord/EditListingPage'
import type { Listing } from '../src/types/listing.types'

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

function setup() {
  const store = configureStore({
    reducer: { auth: authReducer, ui: uiReducer },
  })
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  function Wrapper() {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/landlord/listings/l1/edit']}>
            <Routes>
              <Route path="/landlord/listings/:id/edit" element={<EditListingPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return { store, ...render(<EditListingPage />, { wrapper: Wrapper }) }
}

describe('Edit listing', () => {
  beforeEach(() => {
    navigateMock.mockClear()
    vi.restoreAllMocks()
  })

  it('prefills the form with the existing address and coordinates', async () => {
    setup()
    expect(await screen.findByDisplayValue('Modern 2BR in Panchlaish')).toBeInTheDocument()
    expect(screen.getByDisplayValue('House 12, Road 5, Panchlaish')).toBeInTheDocument()
    expect(screen.getByDisplayValue('22.3569')).toBeInTheDocument()
    expect(screen.getByDisplayValue('91.7832')).toBeInTheDocument()
  })

  it('preserves the original address when submitting an edit', async () => {
    const updateSpy = vi.spyOn(listingsApi, 'updateListing').mockResolvedValue({} as Listing)
    const user = userEvent.setup()
    setup()

    const titleInput = await screen.findByLabelText('Title')
    await user.clear(titleInput)
    await user.type(titleInput, 'Renovated 2BR in Panchlaish')

    await user.click(screen.getByRole('button', { name: 'Update Listing' }))

    await vi.waitFor(() => {
      expect(updateSpy).toHaveBeenCalledTimes(1)
    })
    const [, body] = updateSpy.mock.calls[0] as [string, Record<string, unknown>]
    expect(body.address).toBe('House 12, Road 5, Panchlaish')
    expect(body.title).toBe('Renovated 2BR in Panchlaish')
    expect(body.latitude).toBe(22.3569)
    expect(body.longitude).toBe(91.7832)
    expect(navigateMock).toHaveBeenCalledWith('/landlord/dashboard')
  })
})