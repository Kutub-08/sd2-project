import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { inquirySchema, type InquiryInput } from '../../schemas/inquiry.schema'
import { useCreateInquiry } from '../../hooks/mutations/useCreateInquiry'
import type { RootState } from '../../app/store'

type Props = {
  listingId: string
}

export default function InquiryForm({ listingId }: Props) {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)
  const { mutate, isPending } = useCreateInquiry()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
  })

  function onSubmit(data: InquiryInput) {
    mutate(
      { listingId, message: data.message },
      {
        onSuccess: () => {
          toast.success('Inquiry sent successfully')
          reset()
        },
        onError: () => {
          toast.error('Failed to send inquiry. You may have reached the daily limit.')
        },
      },
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border p-4 text-center text-sm text-gray-600">
        <Link to="/login" className="text-blue-600 underline">Sign in</Link> to send an inquiry
      </div>
    )
  }

  if (role === 'LANDLORD') {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-lg border p-4">
      <h3 className="text-sm font-semibold text-gray-900">Send an Inquiry</h3>

      <div>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Write your message here (min 10 characters)..."
          className="block w-full rounded border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  )
}
