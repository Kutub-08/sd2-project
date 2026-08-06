// ──────────────────── Class string tokens ────────────────────

/** Base glass card skeleton — add `p-*` as needed */
export const GLASS_CARD = 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm'

/** Heavier panel with black tint (sidebar, filter) */
export const GLASS_PANEL = 'rounded-2xl border border-white/10 bg-black/50 backdrop-blur-3xl'

/** Primary glass button (full-width by default) */
export const GLASS_BUTTON = 'w-full rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-50'

/** Dark-themed input */
export const GLASS_INPUT = 'mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-white/40 focus:outline-none'

/** Feature pill / badge */
export const GLASS_PILL = 'inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 backdrop-blur-sm'

/** Glass link button (inline) */
export const GLASS_LINK_BUTTON = 'inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition-colors hover:bg-white/20'

// ──────────────────── Framer-motion variants ────────────────────

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
