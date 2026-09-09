import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { KeyRound } from 'lucide-react'
import Button from '../components/ui/Button'
import LightningBackground from '../components/hero/LightningBackground'
import { requestVerification, verifyEmail } from '../api/auth.api'
import { updateUser } from '../features/auth/authSlice'
import type { AppDispatch, RootState } from '../app/store'
import type { ApiError } from '../types/api.types'

const CODE_LENGTH = 6

function CodeEntry({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex cursor-text justify-between gap-2"
        role="presentation"
      >
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <span
            key={i}
            className={`flex h-13 w-10 items-center justify-center rounded-lg border font-mono text-xl text-paper transition-colors ${
              value[i]
                ? 'border-teal/60 bg-teal/10 text-teal shadow-[0_0_16px_-4px_rgba(45,214,191,0.6)]'
                : i === value.length
                  ? 'border-amberglow/60 bg-ink'
                  : 'border-line bg-ink-soft'
            }`}
          >
            {value[i] ?? ''}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))}
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-label={`${CODE_LENGTH}-digit verification code`}
        className="sr-only"
        autoFocus
      />
    </div>
  )
}

export default function VerifyEmailPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, role } = useSelector((state: RootState) => state.auth)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const mounted = useRef(true)

  const dashboardPath = role === 'LANDLORD' ? '/landlord/dashboard' : '/dashboard'

  const sendCode = useCallback(
    async (notify: boolean) => {
      setSending(true)
      try {
        await requestVerification()
        if (notify && mounted.current) toast.success('A new code is on its way')
      } catch (err: unknown) {
        if (!mounted.current) return
        const apiErr = isAxiosError<ApiError>(err)
        if (apiErr && err.response?.data?.error?.code === 'ALREADY_VERIFIED') {
          dispatch(updateUser({ isVerified: true }))
          toast.success('Your email is already verified')
          navigate(dashboardPath, { replace: true })
          return
        }
        toast.error('Could not send a verification code. Try again.')
      } finally {
        if (mounted.current) setSending(false)
      }
    },
    [dispatch, navigate, dashboardPath],
  )

  useEffect(() => {
    mounted.current = true
    if (user?.isVerified) return
    void sendCode(false)
    return () => {
      mounted.current = false
    }
  }, [sendCode, user?.isVerified])

  async function handleVerify() {
    if (!/^\d{6}$/.test(code)) {
      setError(`Enter the ${CODE_LENGTH}-digit code`)
      return
    }
    setError('')
    setVerifying(true)
    try {
      const res = await verifyEmail(code)
      dispatch(updateUser({ ...res.data.user, isVerified: true }))
      toast.success('Email verified')
      navigate(dashboardPath, { replace: true })
    } catch (err: unknown) {
      const message =
        isAxiosError<ApiError>(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : 'That code did not work. Try again.'
      setError(message)
    } finally {
      setVerifying(false)
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
              Check your inbox
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-paper">
              Verify your email
            </h1>
          </div>
        </div>

        {user?.isVerified ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-mist">
              Your email is already verified — you're all set.
            </p>
            <Button onClick={() => navigate(dashboardPath)} className="w-full">
              Go to my dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-mist">
              We emailed a {CODE_LENGTH}-digit code to{' '}
              <span className="text-paper">{user?.email}</span>. Landlords need
              a verified email before they can publish a listing.
            </p>

            <CodeEntry value={code} onChange={setCode} />

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <Button
              onClick={handleVerify}
              disabled={code.length !== CODE_LENGTH}
              loading={verifying}
              className="w-full"
            >
              Verify
            </Button>

            <p className="text-center text-sm text-mist">
              Didn't get it?{' '}
              <button
                onClick={() => sendCode(true)}
                disabled={sending}
                className="text-teal underline underline-offset-4 disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send a new code'}
              </button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}