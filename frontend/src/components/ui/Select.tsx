import { forwardRef, type SelectHTMLAttributes } from 'react'

type Option = { value: string; label: string }

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
  options: Option[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, placeholder, className = '', id, ...rest }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-paper/80">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`block w-full rounded-lg border bg-ink-soft px-3 py-2 text-sm text-paper transition-colors focus:outline-none focus:ring-2 focus:ring-teal/40 ${
            error
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/40'
              : 'border-line focus:border-teal/50'
          } ${className}`}
          aria-invalid={!!error}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-ink text-paper">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
export default Select