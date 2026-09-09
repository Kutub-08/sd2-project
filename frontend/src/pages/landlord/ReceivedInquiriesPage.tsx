import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useInquiriesReceived } from '../../hooks/queries/useInquiries'
import { useUpdateInquiryStatus } from '../../hooks/mutations/useUpdateInquiryStatus'
import Pagination from '../../components/ui/Pagination'
import Skeleton from '../../components/ui/Skeleton'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { formatDate } from '../../utils/formatDate'

const statusVariant: Record<string, 'default' | 'warning' | 'success' | 'info'> = {
  PENDING: 'warning',
  RESPONDED: 'success',
  CLOSED: 'info',
}

const nextStatus: Record<string, 'RESPONDED' | 'CLOSED'> = {
  PENDING: 'RESPONDED',
  RESPONDED: 'CLOSED',
}

export default function ReceivedInquiriesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useInquiriesReceived(page)
  const updateStatus = useUpdateInquiryStatus()

  function handleAdvanceStatus(id: string, currentStatus: string) {
    const next = nextStatus[currentStatus]
    if (!next) return
    updateStatus.mutate(
      { id, status: next },
      {
        onSuccess: () => toast.success(`Inquiry marked as ${next}`),
        onError: () => toast.error('Failed to update status'),
      },
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-mist">
        <p className="text-lg font-medium text-paper">Failed to load inquiries</p>
        <Link to="/landlord/dashboard" className="mt-4 text-sm text-teal underline underline-offset-4">Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-6 font-display text-2xl font-semibold tracking-tight text-paper">Received Inquiries</h1>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          title="No inquiries received yet"
          description="Inquiries from tenants will appear here"
          actionLabel="Back to dashboard"
          actionTo="/landlord/dashboard"
        />
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((inq) => (
              <div key={inq.id} className="rounded-2xl border border-white/10 bg-ink-soft/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-paper">{inq.tenant?.name ?? 'Unknown'}</p>
                      <Badge variant={statusVariant[inq.status] ?? 'default'}>{inq.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-mist">{inq.tenant?.email}</p>
                    <Link
                      to={`/listings/${inq.listingId}`}
                      className="mt-1 inline-block text-xs text-teal hover:underline"
                    >
                      {inq.listing?.title ?? 'View listing'} &rarr;
                    </Link>
                    <p className="mt-2 text-sm text-paper/80">{inq.message}</p>
                    <p className="mt-1 text-xs text-mist/70">{formatDate(inq.createdAt)}</p>
                  </div>
                  <div className="shrink-0">
                    {nextStatus[inq.status] && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="whitespace-nowrap"
                        onClick={() => handleAdvanceStatus(inq.id, inq.status)}
                        disabled={updateStatus.isPending}
                      >
                        Mark as {nextStatus[inq.status]}
                      </Button>
                    )}
                  </div>
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
