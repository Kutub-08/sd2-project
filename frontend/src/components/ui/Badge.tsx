import type { ReactNode } from 'react'

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info'

type Props = {
  variant?: Variant
  children: ReactNode
  className?: string
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-white/5 text-paper/80 border border-white/10',
  success: 'bg-teal/10 text-teal border border-teal/30',
  warning: 'bg-amberglow/10 text-amberglow border border-amberglow/30',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/30',
  info: 'bg-teal/10 text-teal border border-teal/30',
}

export default function Badge({ variant = 'default', children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}