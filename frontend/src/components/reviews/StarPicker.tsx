import { useState } from 'react'
import { Star } from 'lucide-react'

const VERDICTS: Record<number, string> = {
  1: 'Falls short of what it reads like.',
  2: 'A rough stay. Look hard before you commit.',
  3: 'It works — worth a careful walkthrough.',
  4: 'Solid. A few small gripes, nothing major.',
  5: 'Worth it — this one’s a keeper.',
}
const VERDICT_NONE = 'Pick a rating — the verdict phrase appears here.'

type Props = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export default function StarPicker({ value, onChange, disabled }: Props) {
  const [hover, setHover] = useState(0)
  const active = hover > 0 ? hover : value

  return (
    <div>
      <div role="radiogroup" aria-label="Star rating" className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const lit = n <= active
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              disabled={disabled}
              onClick={() => onChange(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              className="cursor-pointer rounded-lg p-0.5 text-mist/30 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
            >
              <Star className={`h-7 w-7 ${lit ? 'fill-amberglow text-amberglow' : ''}`} aria-hidden="true" />
            </button>
          )
        })}
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-xs text-mist">
        {active > 0 ? VERDICTS[active] : VERDICT_NONE}
      </p>
    </div>
  )
}