import { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/features/auth/authSlice'
import uiReducer from '../src/features/ui/uiSlice'
import type { RootState } from '../src/app/store'

function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { auth: authReducer, ui: uiReducer },
    preloadedState: preloadedState as RootState | undefined,
  })
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  })
}

type CustomRenderOptions = {
  preloadedState?: Partial<RootState>
  initialEntries?: MemoryRouterProps['initialEntries']
  renderOptions?: Omit<RenderOptions, 'wrapper'>
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, initialEntries = ['/'], renderOptions }: CustomRenderOptions = {},
) {
  const store = createTestStore(preloadedState)
  const queryClient = createTestQueryClient()

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return { store, queryClient, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
