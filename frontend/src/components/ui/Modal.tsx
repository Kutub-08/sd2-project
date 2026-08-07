import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'md' | 'lg'
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    if (!isOpen) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-ink-deep/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={`relative z-10 w-full ${size === 'lg' ? 'max-w-2xl' : 'max-w-md'} rounded-2xl border border-white/10 bg-ink-soft p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]`}>
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-paper">{title}</h2>
            <button
              onClick={onClose}
              className="rounded p-1 text-mist transition-colors hover:bg-white/5 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}