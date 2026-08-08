import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './testUtils'
import AISearchPage from '../src/pages/AISearchPage'

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
})
