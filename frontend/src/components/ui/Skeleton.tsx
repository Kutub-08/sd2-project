type Props = {
  className?: string
}

export default function Skeleton({ className = '' }: Props) {
  return (
    <div
      className={`animate-pulse rounded-md bg-ink-soft ring-1 ring-white/5 ${className}`}
      aria-hidden="true"
    />
  )
}