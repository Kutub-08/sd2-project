import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  icon?: ReactNode
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  onAction?: () => void
}

export default function EmptyState({ icon, title, description, actionLabel, actionTo, onAction }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/50">
      {icon && <div className="mb-4">{icon}</div>}
      <p className="text-lg font-medium text-white/70">{title}</p>
      {description && <p className="mt-1 text-sm text-white/40">{description}</p>}
      {actionLabel && (
        <div className="mt-4">
          {actionTo ? (
            <Link to={actionTo} className="text-sm text-blue-400 underline hover:text-blue-300">
              {actionLabel}
            </Link>
          ) : (
            <button onClick={onAction} className="text-sm text-blue-400 underline hover:text-blue-300">
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
