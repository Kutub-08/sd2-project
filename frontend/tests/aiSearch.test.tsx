import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { renderWithProviders } from './testUtils'
import { server } from './mocks/server'
import AISearchPage from '../src/pages/AISearchPage'

const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

describe('AI search', () => {
  it('searches and shows matched results', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AISearchPage />)

    const input = screen.getByPlaceholderText('Try: "2 bed flat under 15k near IIUC"')
    await user.type(input, '2 bed flat in Khulshi')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(await screen.findByText('Luxury 3BR in Khulshi')).toBeInTheDocument()
    expect(screen.getByText(/Found .* result/)).toBeInTheDocument()
  })

  it('sorts results when a sort option is selected', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AISearchPage />)

    const input = screen.getByPlaceholderText('Try: "2 bed flat under 15k near IIUC"')
    await user.type(input, '2 bed flat in Khulshi')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    await screen.findByText('Luxury 3BR in Khulshi')

    const sortSelect = screen.getByRole('combobox', { name: 'Sort results' })
    await user.selectOptions(sortSelect, 'price_asc')

    await vi.waitFor(() => {
      expect(screen.getByText('৳8,000')).toBeInTheDocument()
    })
  })

  it('shows an error state with retry when the API call fails', async () => {
    server.use(
      http.post(`${BASE}/ai/recommend`, () =>
        HttpResponse.json(
          { success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } },
          { status: 500 },
        ),
      ),
    )

    const user = userEvent.setup()
    renderWithProviders(<AISearchPage />)

    const input = screen.getByPlaceholderText('Try: "2 bed flat under 15k near IIUC"')
    await user.type(input, '2 bed flat in Khulshi')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(await screen.findByText('Search failed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()

    server.resetHandlers()
    await user.click(screen.getByRole('button', { name: /try again/i }))

    expect(await screen.findByText('Luxury 3BR in Khulshi')).toBeInTheDocument()
  })
})