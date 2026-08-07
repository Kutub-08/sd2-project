import { Star } from 'lucide-react'

type Props = {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md'
  label?: string
}

export default function RatingStars({ value, onChange, size = 'md', label }: Props) {
  const starClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  if (!onChange) {
    return (
      <span
        className="inline-flex items-center gap-0.5"
        role="img"
        aria-label={label ?? `${value} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${starClass} ${i <= Math.round(value) ? 'fill-amberglow text-amberglow' : 'text-mist/40'}`}
          />
        ))}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-0.5" role="radiogroup" aria-label={label ?? 'Rating'}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
          onClick={() => onChange(i)}
          className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
        >
          <Star
            className={`${starClass} ${i <= value ? 'fill-amberglow text-amberglow' : 'text-mist/40'} transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}
