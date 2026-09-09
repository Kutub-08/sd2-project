import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { reviewSchema, type ReviewInput } from '../../schemas/review.schema'
import { useCreateReview } from '../../hooks/mutations/useCreateReview'
import StarPicker from './StarPicker'
import type { RootState } from '../../app/store'

type Props = {
  listingId: string
  alreadyReviewed: boolean
}

export default function ReviewForm({ listingId, alreadyReviewed }: Props) {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)
  const { mutate, isPending } = useCreateReview()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  })

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-white/10 bg-ink-soft/40 p-5 text-sm text-paper/70">
        <Link to="/login" className="font-semibold text-teal transition-colors hover:underline">
          Sign in
        </Link>{' '}
        to leave a verdict on this flat.
      </div>
    )
  }

  if (role !== 'TENANT') {
    return (
      <p className="mt-6 rounded-2xl border border-white/10 bg-ink-soft/40 p-5 text-sm text-paper/70">
        Only tenants leave reviews here.
      </p>
    )
  }

  if (alreadyReviewed) {
    return (
      <div className="rounded-2xl border border-white/10 bg-ink-soft/40 p-5 text-sm text-paper/70">
        You&#39;ve already left a verdict on this flat. One per flat.
      </div>
    )
  }

  function onSubmit(data: ReviewInput) {
    mutate(
      { listingId, rating: data.rating, comment: data.comment },
      {
        onSuccess: () => {
          toast.success('Review posted')
          reset()
        },
        onError: () => {
          toast.error('Couldn’t post your review. Please try again.')
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 rounded-2xl border border-teal/20 bg-ink-soft/40 p-5"
    >
      <h3 className="font-display text-sm font-semibold text-paper">Leave a verdict</h3>

      <div className="mt-4">
        <label className="block text-xs text-mist">Rating</label>
        <div className="mt-1.5">
          <Controller
            name="rating"
            control={control}
            render={({ field }) => <StarPicker value={field.value} onChange={field.onChange} disabled={isPending} />}
          />
        </div>
        {errors.rating && (
          <p role="alert" className="mt-1 text-sm text-red-400">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="review-comment" className="mb-1.5 block text-xs text-mist">
          Your take
        </label>
        <textarea
          id="review-comment"
          {...register('comment')}
          rows={4}
          placeholder="What’s it actually like to live here week to week?"
          className="block w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-paper placeholder:text-mist/50 transition-colors focus:border-teal/40 focus:outline-none"
        />
        {errors.comment && (
          <p role="alert" className="mt-1 text-sm text-red-400">
            {errors.comment.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Posting…' : 'Post review'}
      </button>
    </form>
  )
}