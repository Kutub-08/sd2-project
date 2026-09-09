import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { X, KeyRound } from 'lucide-react'
import type { RootState } from '../../app/store'

export default function EmailVerificationBanner() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [dismissed, setDismissed] = useState(false)

  if (!isAuthenticated || !user || user.isVerified || dismissed) {
    return null
  }

  return (
    <div className="border-b border-amberglow/20 bg-amberglow/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <p className="flex min-w-0 items-center gap-2 text-sm text-paper/90">
          <KeyRound className="h-4 w-4 shrink-0 text-amberglow" />
          <span className="truncate">
            Verify your email to publish listings.
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/verify-email"
            className="text-sm font-medium text-amberglow underline underline-offset-4 hover:text-paper"
          >
            Verify now
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss verification notice"
            className="text-mist transition-colors hover:text-paper"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}