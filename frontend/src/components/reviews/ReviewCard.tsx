import StarRating from './StarRating'
import { formatDate } from '../../utils/formatDate'
import type { Review } from '../../types/review.types'

export default function ReviewCard({ review }: { review: Review }) {
  const initial = review.tenant.name.trim().charAt(0).toUpperCase() || 'T'

  return (
    <article className="rounded-2xl border border-white/10 bg-ink-soft/40 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-teal/10 font-display text-xs font-semibold text-teal">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-paper">{review.tenant.name}</p>
            <p className="text-xs text-mist">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <StarRating value={review.rating} size={14} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-paper/70">{review.comment}</p>
    </article>
  )
}