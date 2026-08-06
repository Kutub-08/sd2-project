import { useMemo, useState, useEffect, useRef, type FormEvent, type ChangeEvent, type KeyboardEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
} from 'framer-motion'
import { Search, ArrowRight, Loader2, CornerDownLeft } from 'lucide-react'

const AREAS = [
  'Bashundhara R/A',
  'Banani',
  'Gulshan',
  'Dhanmondi',
  'Mohammadpur',
  'Mirpur',
  'Uttara',
  'Bansree',
  'Badda',
  'Rampura',
  'Paikpara',
  'Tejgaon',
  'Motijheel',
  'Agrabad',
  'Nashirabad',
  'Khulshi',
  'GEC',
  'Chandgaon',
  'Patiya',
  'Halishahar',
  'Anderkilla',
]

const BUILDINGS = [
  { left: '0%', width: '13%', height: '34%' },
  { left: '9%', width: '9%', height: '52%' },
  { left: '16%', width: '14%', height: '42%' },
  { left: '28%', width: '8%', height: '64%' },
  { left: '34%', width: '12%', height: '48%' },
  { left: '44%', width: '10%', height: '58%' },
  { left: '52%', width: '13%', height: '38%' },
  { left: '63%', width: '8%', height: '55%' },
  { left: '69%', width: '12%', height: '44%' },
  { left: '79%', width: '9%', height: '60%' },
  { left: '86%', width: '14%', height: '36%' },
]

function windowClass(index: number) {
  const lit = (index * 7) % 9 < 2
  const flicker = (index * 3) % 11 === 0
  if (flicker) return 'tolet-window tolet-window--lit tolet-window--flicker'
  if (lit) return 'tolet-window tolet-window--lit'
  return 'tolet-window'
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stats = [
  { label: 'Listings', value: 1200, suffix: '+' },
  { label: 'Landlords', value: 480, suffix: '+' },
  { label: 'Cities', value: 12, suffix: '' },
  { label: 'Tenants', value: 3500, suffix: '+' },
]

function CountUp({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 1200
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

/** Highlight the matched substring within a suggestion */
function Highlighted({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase()
  if (!q) return <>{text}</>
  const idx = text.toLowerCase().indexOf(q)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-teal">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  )
}

export default function HeroSection() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const statsRef = useRef<HTMLDivElement>(null)
  const areaInputRef = useRef<HTMLInputElement>(null)
  const [statsStarted, setStatsStarted] = useState(false)
  const [area, setArea] = useState('')
  const [priceText, setPriceText] = useState('')
  const [suggestions, setSuggestions] = useState(false)
  const [activeS, setActiveS] = useState(0)
  const [priced, setPriced] = useState(false)
  const [searching, setSearching] = useState(false)

  // Mouse-parallax motion values for the drifting gradient blobs
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const parallaxY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStatsStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const skylineWindows = useMemo(() => Array.from({ length: 28 }, (_, i) => windowClass(i)), [])

  const suggestionsList = useMemo(() => {
    const q = area.trim().toLowerCase()
    if (!q) return []
    return AREAS.filter((a) => a.toLowerCase().includes(q)).slice(0, 6)
  }, [area])

  useEffect(() => setActiveS(0), [area])

  function pickSuggestion(name: string) {
    setArea(name)
    setSuggestions(false)
    areaInputRef.current?.focus()
  }

  function handleAreaKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!suggestionsList.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveS((p) => (p + 1) % suggestionsList.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveS((p) => (p - 1 + suggestionsList.length) % suggestionsList.length)
    } else if (e.key === 'Enter' && suggestionsList[activeS]) {
      e.preventDefault()
      pickSuggestion(suggestionsList[activeS])
    } else if (e.key === 'Escape') {
      setSuggestions(false)
    }
  }

  function onPriceChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d]/g, '')
    setPriceText(raw ? Number(raw).toLocaleString('en-US') : '')
  }

  function onAreaChange(v: string) {
    setArea(v)
    setSuggestions(true)
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    if (searching) return
    if (suggestionsList.length && suggestionsList[activeS]) {
      pickSuggestion(suggestionsList[activeS])
      return
    }
    setSearching(true)
    // simulate the network + framer transition, ~600ms, then go
    setTimeout(() => {
      const params = new URLSearchParams()
      if (area.trim()) params.set('area', area.trim())
      const rawPrice = priceText.replace(/,/g, '')
      if (rawPrice) params.set('maxPrice', rawPrice)
      navigate(`/listings?${params.toString()}`)
    }, 600)
  }

  const parallaxProps = reduce
    ? {}
    : { style: { x: parallaxX, y: parallaxY } }

  const drift = reduce
    ? {}
    : {
        animate: {
          x: [0, 30, -12, 0],
          y: [0, -24, 18, 0],
          scale: [1, 1.12, 0.96, 1],
        },
        transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' as const },
      }

  function onSectionMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return
    const { innerWidth: w, innerHeight: h } = window
    mouseX.set((e.clientX / w - 0.5) * 1.5)
    mouseY.set((e.clientY / h - 0.5) * 1.5)
  }

  return (
    <section
      className="relative isolate flex min-h-[92vh] flex-col overflow-hidden bg-ink text-paper"
      onMouseMove={onSectionMouseMove}
    >
      {/* Dusk gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(110% 70% at 50% 0%, #12233A 0%, #0B1420 55%, #070E18 100%)',
        }}
      />

      {/* Drifting teal blob */}
      <motion.div {...parallaxProps} className="pointer-events-none absolute -z-10" aria-hidden="true">
        <motion.div
          {...drift}
          className="h-72 w-72 rounded-full bg-teal/15 blur-3xl"
          style={{ left: '12%', top: '26%' }}
        />
      </motion.div>
      {/* Drifting orange blob */}
      <motion.div {...parallaxProps} className="pointer-events-none absolute -z-10" aria-hidden="true">
        <motion.div
          {...drift}
          className="h-80 w-80 rounded-full bg-amberglow/10 blur-3xl"
          style={{ right: '10%', top: '36%' }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-44 pt-16 text-center sm:px-6"
        variants={containerVariants}
        initial={reduce ? undefined : 'hidden'}
        animate={reduce ? undefined : 'visible'}
      >
        <motion.p
          variants={itemVariants}
          className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-teal"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
          </span>
          Bangladesh flat marketplace · no brokerage
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mt-6 font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Find a flat you can
          <br className="hidden sm:block" /> call{' '}
          <motion.span
            className="inline-block text-amberglow"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.02, 1], textShadow: [
                    '0 0 0px rgba(255,180,94,0)',
                    '0 0 26px rgba(255,180,94,0.55)',
                    '0 0 0px rgba(255,180,94,0)',
                  ] }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            home
          </motion.span>
          .
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
        >
          Search verified flats across Dhaka, Chattogram and 10 more cities,
          then message the landlord directly. Transparent rent in ৳, no
          middleman.
        </motion.p>

        {/* Search console */}
        <motion.div variants={itemVariants} className="relative mt-10 w-full max-w-2xl">
          <motion.form
            onSubmit={handleSearch}
            className={`flex w-full flex-col gap-2 rounded-2xl border p-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 ease-out sm:flex-row sm:items-center ${
              priced ? 'border-teal/60' : 'border-white/10'
            } ${priced ? 'bg-ink' : 'bg-ink-soft/80'}`}
          >
            <input
              ref={areaInputRef}
              type="text"
              value={area}
              onChange={(e) => onAreaChange(e.target.value)}
              onFocus={() => setSuggestions(true)}
              onKeyDown={handleAreaKeyDown}
              placeholder="Area or neighborhood, e.g. Bashundhara R/A"
              aria-label="Area or neighborhood"
              className="w-full flex-1 cursor-pointer rounded-xl border border-transparent bg-transparent px-3.5 py-3 text-sm text-paper placeholder-mist/50 outline-none transition-colors focus:border-teal/50"
            />
            <div className="hidden h-7 w-px shrink-0 bg-white/10 sm:block" />
            <input
              type="text"
              inputMode="numeric"
              value={priceText}
              onChange={onPriceChange}
              onFocus={() => setPriced(true)}
              onBlur={() => setPriced(false)}
              placeholder="Max rent (৳)"
              aria-label="Maximum monthly rent"
              className="w-full cursor-pointer rounded-xl border border-transparent bg-transparent px-3.5 py-3 text-sm text-paper placeholder-mist/50 outline-none transition-colors focus:border-teal/50 sm:w-44"
            />
            <button
              type="submit"
              disabled={searching}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 self-stretch rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-ink-deep transition-all duration-300 ease-out hover:scale-[1.02] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none sm:self-auto disabled:cursor-not-allowed disabled:opacity-90"
            >
              {searching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110" />
              )}
              {searching ? 'Searching…' : 'Find flats'}
            </button>
          </motion.form>

          {/* Live area suggestions */}
          {suggestions && suggestionsList.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/95 p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              role="listbox"
            >
              {suggestionsList.map((name, i) => (
                <li key={name} role="option" aria-selected={i === activeS}>
                  <button
                    type="button"
                    onClick={() => pickSuggestion(name)}
                    onMouseEnter={() => setActiveS(i)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      i === activeS ? 'bg-teal/10 text-paper' : 'text-paper/80'
                    }`}
                  >
                    <Highlighted text={name} query={area} />
                    {i === activeS && <CornerDownLeft className="h-3.5 w-3.5 text-teal" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={itemVariants}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-mist"
        >
          <span className="text-teal">✓</span> Verified listings
          <span aria-hidden="true">·</span>
          <span className="text-teal">✓</span> Direct landlord contact
          <span aria-hidden="true">·</span>
          <span className="text-teal">✓</span> No brokerage
        </motion.p>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          variants={itemVariants}
          className="mt-12 flex w-full max-w-2xl items-start justify-center divide-x divide-white/10"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex-1 cursor-pointer px-2 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:drop-shadow-[0_8px_18px_rgba(45,214,191,0.25)] sm:px-4"
            >
              <div className="font-mono text-xl font-semibold text-teal sm:text-2xl">
                {statsStarted ? <CountUp value={s.value} suffix={s.suffix} start /> : `0${s.suffix}`}
              </div>
              <div className="mt-1 text-[11px] text-mist">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          <Link
            to="/listings"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm text-paper/85 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-teal/50 hover:text-teal focus-visible:ring-2 focus-visible:ring-teal/50 focus-visible:outline-none"
          >
            Browse all listings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Skyline signature — towers whose windows light up */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[34vh]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #070E18 0%, #0B1420 45%, transparent 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0">
          {BUILDINGS.map((b, i) => (
            <div
              key={i}
              className="absolute bottom-0 border-t border-t-white/10 bg-ink-deep"
              style={{
                left: b.left,
                width: b.width,
                height: `min(${b.height}, 34vh)`,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            >
              <div
                className="grid h-full grid-cols-3 gap-1.5 p-2 opacity-60"
                style={{ gridTemplateRows: 'repeat(6, 1fr)' }}
              >
                {skylineWindows.slice(0, 18).map((cls, wi) => (
                  <div key={wi} className={cls} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}