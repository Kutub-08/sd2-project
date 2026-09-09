import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/features/auth/authSlice'
import uiReducer from '../src/features/ui/uiSlice'
import ListingsPage from '../src/pages/ListingsPage'
import { renderWithProviders } from './testUtils'
import type { RootState } from '../src/app/store'

function setup(initialEntries = ['/listings']) {
  const store = configureStore({
    reducer: { auth: authReducer, ui: uiReducer },
  })
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return { store, ...render(<ListingsPage />, { wrapper: Wrapper }) }
}

describe('Listings browse + filter', () => {
  it('renders the listings page heading', () => {
    setup()
    expect(screen.getByText('Available flats in Bangladesh')).toBeInTheDocument()
  })

  it('displays listings from the API', async () => {
    setup()
    expect(await screen.findByText('Modern 2BR in Panchlaish')).toBeInTheDocument()
    expect(screen.getByText('Budget 1BR near IIUC')).toBeInTheDocument()
    expect(screen.getByText('Luxury 3BR in Khulshi')).toBeInTheDocument()
    expect(screen.getByText('Studio in GEC')).toBeInTheDocument()
  })

  it('shows price in BDT format', async () => {
    setup()
    expect(await screen.findByText('৳15,000')).toBeInTheDocument()
    expect(screen.getByText('৳8,000')).toBeInTheDocument()
  })

  it('filters listings by area via FilterPanel', async () => {
    const user = userEvent.setup()
    setup()

    await screen.findByText('Modern 2BR in Panchlaish')

    const areaInput = screen.getByPlaceholderText('e.g. Bashundhara')
    await user.type(areaInput, 'Khulshi')
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    await vi.waitFor(() => {
      expect(screen.getByText('Luxury 3BR in Khulshi')).toBeInTheDocument()
    })
    expect(screen.queryByText('Modern 2BR in Panchlaish')).not.toBeInTheDocument()
  })

  it('filters by bedrooms via FilterPanel', async () => {
    const user = userEvent.setup()
    setup()

    await screen.findByText('Modern 2BR in Panchlaish')

    await user.selectOptions(screen.getByLabelText('Bedrooms'), '3')
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    await vi.waitFor(() => {
      expect(screen.getByText('Luxury 3BR in Khulshi')).toBeInTheDocument()
    })
    expect(screen.queryByText('Budget 1BR near IIUC')).not.toBeInTheDocument()
  })

  it('resets filters when Reset button is clicked', async () => {
    const user = userEvent.setup()
    setup()

    await screen.findByText('Modern 2BR in Panchlaish')

    const areaInput = screen.getByPlaceholderText('e.g. Bashundhara')
    await user.type(areaInput, 'Panchlaish')
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    await vi.waitFor(() => {
      expect(screen.getByText('Modern 2BR in Panchlaish')).toBeInTheDocument()
      expect(screen.queryByText('Budget 1BR near IIUC')).not.toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Reset' }))

    await vi.waitFor(() => {
      expect(screen.getByText('Budget 1BR near IIUC')).toBeInTheDocument()
      expect(screen.getByText('Luxury 3BR in Khulshi')).toBeInTheDocument()
      expect(screen.getByText('Studio in GEC')).toBeInTheDocument()
    })
  })

  it('changes sort order', async () => {
    const user = userEvent.setup()
    setup()

    await screen.findByText('Modern 2BR in Panchlaish')

    const sortSelect = screen.getByRole('combobox', { name: 'Sort by' })
    await user.selectOptions(sortSelect, 'price_asc')

    // The cheapest listing (8,000) should remain visible
    expect(screen.getByText('৳8,000')).toBeInTheDocument()
  })

  it('shows empty state when no listings match', async () => {
    const user = userEvent.setup()
    setup()

    await screen.findByText('Modern 2BR in Panchlaish')

    const areaInput = screen.getByPlaceholderText('e.g. Bashundhara')
    await user.type(areaInput, 'NonExistentAreaXYZ')
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    await vi.waitFor(() => {
      expect(screen.getByText('No flats match your filters')).toBeInTheDocument()
    })
  })

  it('lets a tenant favorite and unfavorite a listing from the browse page', async () => {
    const user = userEvent.setup()
    const preloadedState: Partial<RootState> = {
      auth: {
        user: {
          id: 'tenant1',
          name: 'Test Tenant',
          email: 'tenant@test.com',
          phone: '01733',
          role: 'TENANT',
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        accessToken: 'test-access-token',
        isAuthenticated: true,
        role: 'TENANT',
      },
    }
    renderWithProviders(<ListingsPage />, { preloadedState })

    await screen.findByText('Modern 2BR in Panchlaish')

    const favButtons = screen.getAllByRole('button', { name: 'Add to favorites' })
    expect(favButtons.length).toBeGreaterThan(0)

    await user.click(favButtons[0])
    expect(await screen.findByRole('button', { name: 'Remove from favorites' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove from favorites' }))
    await vi.waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Remove from favorites' })).not.toBeInTheDocument()
    })
    expect(screen.getAllByRole('button', { name: 'Add to favorites' })).toHaveLength(favButtons.length)
  })
})
