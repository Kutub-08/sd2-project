import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInquiriesSent } from '../../hooks/queries/useInquiries'
import Pagination from '../../components/ui/Pagination'
import Skeleton from '../../components/ui/Skeleton'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate } from '../../utils/formatDate'

const statusVariant: Record<string, 'default' | 'warning' | 'success' | 'info'> = {
  PENDING: 'warning',
  RESPONDED: 'success',
  CLOSED: 'info',
}

export default function SentInquiriesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useInquiriesSent(page, 20)

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">Failed to load inquiries</p>
        <Link to="/" className="mt-4 text-sm text-blue-600 underline">Go home</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Sent Inquiries</h1>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          title="No inquiries sent yet"
          description="Send an inquiry from any listing page to get started"
          actionLabel="Browse listings"
          actionTo="/listings"
        />
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between rounded-lg border bg-white p-4">
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/listings/${inq.listingId}`}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {inq.listing?.title ?? 'Listing'}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{inq.message}</p>
                  <p className="mt-1 text-xs text-gray-400">{formatDate(inq.createdAt)}</p>
                </div>
                <div className="shrink-0 pl-4">
                  <Badge variant={statusVariant[inq.status] ?? 'default'}>{inq.status}</Badge>
                </div>
              </div>
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={data.page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
