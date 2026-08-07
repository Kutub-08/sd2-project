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
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-24 text-center">
      {icon && <div className="mb-4 text-teal">{icon}</div>}
      <p className="font-display text-lg font-semibold text-paper">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-mist">{description}</p>}
      {actionLabel && (
        <div className="mt-5">
          {actionTo ? (
            <Link to={actionTo} className="text-sm font-medium text-teal underline-offset-4 hover:text-teal/80 hover:underline">
              {actionLabel}
            </Link>
          ) : (
            <button onClick={onAction} className="text-sm font-medium text-teal underline-offset-4 hover:text-teal/80 hover:underline">
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}