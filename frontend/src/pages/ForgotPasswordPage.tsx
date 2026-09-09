import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { KeyRound } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LightningBackground from '../components/hero/LightningBackground'
import { forgotPassword } from '../api/auth.api'
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from '../schemas/auth.schema'
import type { ApiError } from '../types/api.types'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordInput) {
    try {
      await forgotPassword(data.email)
      setSent(true)
      toast.success('Reset link sent')
    } catch (err: unknown) {
      const message =
        isAxiosError<ApiError>(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : 'Could not send the reset link. Try again.'
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
              Lost your key?
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-paper">
              Reset your password
            </h1>
          </div>
        </div>

        {sent ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-mist">
              If that address has a To-Let account, the reset link is on its
              way. It expires in 15 minutes — check spam if it doesn't arrive.
            </p>
            <Link
              to="/login"
              className="inline-block text-sm text-teal underline underline-offset-4"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Button type="submit" loading={isSubmitting} className="w-full">
              Send reset link
            </Button>
            <p className="text-center text-sm text-mist">
              Remembered it?{' '}
              <Link to="/login" className="text-teal underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  )
}