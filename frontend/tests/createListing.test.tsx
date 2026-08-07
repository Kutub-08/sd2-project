import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/features/auth/authSlice'
import uiReducer from '../src/features/ui/uiSlice'
import CreateListingPage from '../src/pages/landlord/CreateListingPage'

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

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/landlord/listings/new']}>
            {children}
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return { store, ...render(<CreateListingPage />, { wrapper: Wrapper }) }
}

describe('Create listing', () => {
  beforeEach(() => { navigateMock.mockClear() })

  it('renders the form with all required fields', () => {
    setup()
    expect(screen.getByRole('heading', { name: 'Create Listing' })).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Price (monthly, ৳)')).toBeInTheDocument()
    expect(screen.getByLabelText('Size (sqft)')).toBeInTheDocument()
    expect(screen.getByLabelText('Bedrooms')).toBeInTheDocument()
    expect(screen.getByLabelText('Bathrooms')).toBeInTheDocument()
    expect(screen.getByLabelText('Area')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Latitude')).toBeInTheDocument()
    expect(screen.getByLabelText('Longitude')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Listing' })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: 'Create Listing' }))

    expect(await screen.findByText('Title must be at least 3 characters')).toBeInTheDocument()
    expect(screen.getByText('Description must be at least 10 characters')).toBeInTheDocument()
  })

  it('submits the form and navigates on success', async () => {
    const user = userEvent.setup()
    setup()

    await user.type(screen.getByLabelText('Title'), 'New Test Apartment')
    await user.type(screen.getByLabelText('Description'), 'A beautiful apartment in the heart of the city with all modern amenities')
    await user.type(screen.getByLabelText('Price (monthly, ৳)'), '25000')
    await user.type(screen.getByLabelText('Size (sqft)'), '1200')
    await user.type(screen.getByLabelText('Bedrooms'), '3')
    await user.type(screen.getByLabelText('Bathrooms'), '2')
    await user.type(screen.getByLabelText('Floor number'), '4')
    await user.type(screen.getByLabelText('Area'), 'Gulshan')
    await user.type(screen.getByLabelText('City'), 'Dhaka')
    await user.type(screen.getByLabelText('Address'), '123 Gulshan Avenue')
    await user.type(screen.getByLabelText('Latitude'), '23.78')
    await user.type(screen.getByLabelText('Longitude'), '90.41')
    await user.type(screen.getByLabelText('Amenities (comma-separated)'), 'WiFi, Parking, AC')

    await user.click(screen.getByRole('button', { name: 'Create Listing' }))

    await vi.waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/landlord/dashboard')
    })
  })
})
