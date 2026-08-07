import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-teal text-ink-deep font-semibold hover:brightness-110 focus-visible:ring-teal/60 disabled:bg-teal/40',
  secondary:
    'bg-ink-soft text-paper border border-white/10 hover:border-teal/50 hover:text-teal focus-visible:ring-teal/50 disabled:opacity-50',
  outline:
    'text-paper border border-white/15 hover:border-teal/60 hover:text-teal focus-visible:ring-teal/50 disabled:opacity-50',
  ghost:
    'text-mist hover:text-paper hover:bg-white/5 focus-visible:ring-teal/50 disabled:opacity-50',
  danger:
    'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 focus-visible:ring-red-500/50 disabled:opacity-50',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-deep ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <svg className="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}