type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getVisiblePages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | 'ellipsis')[] = [1]
  if (current > 3) pages.push('ellipsis')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('ellipsis')
  pages.push(total)

  return pages
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/5 disabled:opacity-20"
        aria-label="Previous page"
      >
        Prev
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-mist/50">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              page === currentPage
                ? 'bg-teal font-semibold text-ink-deep'
                : 'text-mist hover:bg-white/5 hover:text-paper'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/5 disabled:opacity-40"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  )
}