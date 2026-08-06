import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/features/auth/authSlice'
import uiReducer from '../src/features/ui/uiSlice'
import LoginPage from '../src/pages/LoginPage'

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

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
          <MemoryRouter initialEntries={['/login']}>{children}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return { store, ...render(<LoginPage />, { wrapper: Wrapper }) }
}

describe('Login flow', () => {
  beforeEach(() => { navigateMock.mockClear() })

  it('renders login form with email, password and submit button', () => {
    setup()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields on submit', async () => {
    const user = userEvent.setup()
    setup()
    await user.click(screen.getByRole('button', { name: 'Sign In' }))
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('updates Redux store on successful login as tenant', async () => {
    const user = userEvent.setup()
    const { store } = setup()

    await user.type(screen.getByLabelText('Email'), 'tenant@test.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    await vi.waitFor(() => {
      const state = store.getState().auth
      expect(state.isAuthenticated).toBe(true)
      expect(state.user?.email).toBe('tenant@test.com')
      expect(state.accessToken).toBeTruthy()
      expect(state.role).toBe('TENANT')
    })
  })

  it('navigates to tenant dashboard after login as tenant', async () => {
    const user = userEvent.setup()
    setup()

    await user.type(screen.getByLabelText('Email'), 'tenant@test.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    await vi.waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard')
    })
  })
})
