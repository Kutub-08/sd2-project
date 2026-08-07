import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { reviewSchema, type ReviewInput } from '../../schemas/review.schema'
import { useCreateReview } from '../../hooks/mutations/useCreateReview'
import { useUpdateReview } from '../../hooks/mutations/useUpdateReview'
import { useDeleteReview } from '../../hooks/mutations/useDeleteReview'
import type { RootState } from '../../app/store'
import type { Review } from '../../types/review.types'
import RatingStars from './RatingStars'
import Button from '../ui/Button'

type Props = {
  listingId: string
  landlordId: string
  existingReview?: Review
}

export default function ReviewForm({ listingId, landlordId, existingReview }: Props) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const createMutation = useCreateReview(listingId)
  const updateMutation = useUpdateReview(listingId)
  const deleteMutation = useDeleteReview(listingId)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const isEditing = Boolean(existingReview)
  const isOwner = isAuthenticated && user?.id === landlordId

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: existingReview?.rating ?? 0, comment: existingReview?.comment ?? '' },
  })

  const rating = watch('rating')

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-white/10 p-4 text-center text-sm text-mist">
        <Link to="/login" className="text-teal underline underline-offset-4">
          Sign in
        </Link>{' '}
        to rate and comment on this listing
      </div>
    )
  }

  if (isOwner) {
    return null
  }

  function onSubmit(data: ReviewInput) {
    if (existingReview) {
      updateMutation.mutate(
        { id: existingReview.id, data },
        {
          onSuccess: () => {
            toast.success('Review updated')
            setConfirmDelete(false)
          },
          onError: () => toast.error('Failed to update review'),
        },
      )
      return
    }

    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Review posted')
        reset()
      },
      onError: () => toast.error('Failed to post review'),
    })
  }

  function handleDelete() {
    if (!existingReview) return
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    deleteMutation.mutate(existingReview.id, {
      onSuccess: () => {
        toast.success('Review removed')
        setConfirmDelete(false)
        reset()
      },
      onError: () => toast.error('Failed to remove review'),
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-white/10 bg-ink-soft/60 p-5 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-paper">
          {isEditing ? 'Edit your review' : 'Rate this listing'}
        </h3>
        <RatingStars
          value={rating}
          onChange={(v) => setValue('rating', v, { shouldValidate: true })}
          label="Your rating"
        />
      </div>

      {errors.rating && <p className="-mt-2 text-xs text-red-400">{errors.rating.message}</p>}

      <div>
        <textarea
          {...register('comment')}
          rows={3}
          placeholder="Share your experience (min 5 characters)..."
          className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-paper placeholder-white/40 backdrop-blur-sm transition-colors focus:border-teal/50 focus:outline-none"
        />
        {errors.comment && <p className="mt-1 text-xs text-red-400">{errors.comment.message}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
          {isEditing ? 'Save changes' : 'Post review'}
        </Button>
        {isEditing && (
          <Button type="button" variant="danger" loading={deleteMutation.isPending} onClick={handleDelete}>
            {confirmDelete ? 'Confirm delete?' : 'Delete review'}
          </Button>
        )}
      </div>
    </form>
  )
}
