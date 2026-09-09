import { Star } from 'lucide-react'

type StarRatingProps = { value: number; size?: number; className?: string }

function FitStar({ fill, size }: { fill: number; size: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(fill * 100)))
  if (pct >= 100) {
    return <Star className="fill-amberglow text-amberglow" style={{ width: size, height: size }} aria-hidden="true" />
  }
  if (pct <= 0) {
    return <Star className="text-mist/25" style={{ width: size, height: size }} aria-hidden="true" />
  }
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <Star className="absolute inset-0 text-mist/25" style={{ width: size, height: size }} aria-hidden="true" />
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <Star className="fill-amberglow text-amberglow" style={{ width: size, height: size }} aria-hidden="true" />
      </span>
    </span>
  )
}

export default function StarRating({ value, size = 16, className = '' }: StarRatingProps) {
  const fraction = Math.max(0, Math.min(5, value)) / 5
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, fraction * 5 - (i - 1)))
        return <FitStar key={i} fill={fill} size={size} />
      })}
    </div>
  )
}