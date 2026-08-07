import { forwardRef, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-paper/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-lg border bg-ink-soft px-3 py-2 text-sm text-paper transition-colors placeholder:text-mist/50 focus:outline-none focus:ring-2 focus:ring-teal/40 ${
            error
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/40'
              : 'border-line focus:border-teal/50'
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input