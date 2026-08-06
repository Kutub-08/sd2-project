import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '../src/components/ui/Pagination'

describe('Pagination', () => {
  it('renders nothing when totalPages <= 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders page buttons and nav', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('disables Prev on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
    expect(screen.getByLabelText('Next page')).not.toBeDisabled()
  })

  it('disables Next on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled()
  })

  it('calls onPageChange with correct page number on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onChange} />)

    await user.click(screen.getByText('4'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('calls onPageChange with prev/next', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onChange} />)

    await user.click(screen.getByLabelText('Previous page'))
    expect(onChange).toHaveBeenCalledWith(2)

    await user.click(screen.getByLabelText('Next page'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('highlights the current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />)
    const currentBtn = screen.getByText('3')
    expect(currentBtn).toHaveAttribute('aria-current', 'page')
  })

  it('shows ellipsis for large page counts', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />)
    const ellipses = screen.getAllByText('…')
    expect(ellipses.length).toBeGreaterThanOrEqual(1)
  })

  it('does not show ellipsis for small page counts', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />)
    expect(screen.queryByText('…')).not.toBeInTheDocument()
  })
})
