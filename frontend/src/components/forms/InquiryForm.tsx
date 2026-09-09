import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { inquirySchema, type InquiryInput } from '../../schemas/inquiry.schema'
import { useCreateInquiry } from '../../hooks/mutations/useCreateInquiry'
import Button from '../ui/Button'
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
      <div className="rounded-2xl border border-white/10 bg-ink-soft/60 p-5 text-center text-sm text-mist">
        <Link to="/login" className="text-teal underline underline-offset-4">Sign in</Link> to send an inquiry
      </div>
    )
  }

  if (role === 'LANDLORD') {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-2xl border border-white/10 bg-ink-soft/60 p-5 backdrop-blur-3xl">
      <h3 className="font-display text-base font-semibold text-paper">Send an Inquiry</h3>

      <div>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Write your message here (min 10 characters)..."
          className="block w-full resize-y rounded-lg border border-line bg-black/20 px-3 py-2 text-sm text-paper placeholder:text-mist/50 transition-colors focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/40"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full" loading={isPending}>
        Send Inquiry
      </Button>
    </form>
  )
}
