import type { HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'>

export default function GlowDot({ className, ...props }: Props) {
  return (
    <span className={`relative flex h-1.5 w-1.5 shrink-0 ${className ?? ''}`} {...props}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
    </span>
  )
}
