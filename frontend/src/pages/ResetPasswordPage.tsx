import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { KeyRound } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LightningBackground from '../components/hero/LightningBackground'
import { resetPassword } from '../api/auth.api'
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '../schemas/auth.schema'
import type { ApiError } from '../types/api.types'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onSubmit(data: ResetPasswordInput) {
    if (!token) return
    try {
      await resetPassword(token, data.newPassword)
      toast.success('Password updated — sign in')
      navigate('/login', { replace: true })
    } catch (err: unknown) {
      const message =
        isAxiosError<ApiError>(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : 'Could not reset your password. Try again.'
      toast.error(message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="fixed inset-0 -z-10 opacity-30">
        <LightningBackground />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-soft/70 p-8 backdrop-blur-3xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal/40 bg-teal/10 text-teal">
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amberglow">
              Back inside
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-paper">
              Choose a new password
            </h1>
          </div>
        </div>

        {!token ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-mist">
              This reset link is incomplete — open the full link from your
              email instead.
            </p>
            <Link
              to="/forgot-password"
              className="inline-block text-sm text-teal underline underline-offset-4"
            >
              Request a new link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="New password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat the new password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" loading={isSubmitting} className="w-full">
              Save new password
            </Button>
            <p className="text-center text-sm text-mist">
              <Link to="/login" className="text-teal underline underline-offset-4">
                Back to sign in
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  )
}