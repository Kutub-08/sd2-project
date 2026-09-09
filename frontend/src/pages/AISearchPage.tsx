import { useState, useEffect, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, RotateCcw, TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import AIResultsList from '../components/ai/AIResultsList'
import { useAIRecommend } from '../hooks/queries/useAIRecommend'
import type { AISortOption, AILocation } from '../api/ai.api'

export default function AISearchPage() {
  const { data, search, isPending, hasError } = useAIRecommend()
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sort, setSort] = useState<AISortOption>('relevance')
  const [location, setLocation] = useState<AILocation | undefined>(undefined)

  useEffect(() => {
    if (hasError && submitted) {
      toast.error("Couldn't reach the search service — please try again")
    }
  }, [hasError, submitted])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setSubmitted(true)
    setSort('relevance')
    setLocation(undefined)
    search(trimmed, 'relevance', undefined)
  }

  function handleSortChange(nextSort: AISortOption) {
    if (!data) return
    setSort(nextSort)

    if (nextSort === 'nearest') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            setLocation(loc)
            search(data.query, 'nearest', loc)
          },
          () => {
            toast.error("Couldn't access your location — showing most relevant instead")
            setSort('relevance')
            search(data.query, 'relevance', undefined)
          },
          { timeout: 10000, maximumAge: 60000 },
        )
      } else {
        toast.error("Geolocation isn't supported — showing most relevant instead")
        setSort('relevance')
        search(data.query, 'relevance', undefined)
      }
      return
    }

    search(data.query, nextSort, location)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink">
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        animate={{ opacity: submitted ? 0.35 : 0.7 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(60% 55% at 50% 0%, rgba(47,214,191,0.14) 0%, rgba(11,20,32,0) 70%), radial-gradient(40% 40% at 85% 80%, rgba(255,180,94,0.08) 0%, rgba(11,20,32,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div
          className={`transition-all duration-700 ${
            submitted ? 'pt-16' : 'flex min-h-screen items-center justify-center'
          }`}
        >
          <div className="w-full max-w-3xl">
            <motion.div layout className="text-center">
              <motion.div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.3em] text-teal">
                <Sparkles className="h-3.5 w-3.5" />
                AI search
              </motion.div>
              <motion.h1
                layout
                className={`font-display font-semibold tracking-tight text-paper transition-all duration-700 ${
                  submitted ? 'mb-1 text-2xl' : 'mb-3 text-4xl sm:text-5xl'
                }`}
              >
                Search flats in plain English
              </motion.h1>
              <motion.p
                layout
                className={`text-mist transition-all duration-700 ${
                  submitted ? 'mb-6 text-sm' : 'mb-8 text-base'
                }`}
              >
                Describe what you&apos;re looking for and we&apos;ll match it for you
              </motion.p>
            </motion.div>

            <motion.form layout onSubmit={handleSubmit} className="mx-auto">
              <div
                className={`relative mx-auto transition-all duration-700 ${
                  submitted ? 'max-w-2xl' : 'max-w-full'
                }`}
              >
                <div className="relative w-full">
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-teal transition-all duration-700 ${
                      submitted ? 'scale-75' : 'scale-100'
                    }`}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Try: "2 bed flat under 15k near IIUC"'
                    className={`w-full rounded-2xl border border-white/15 bg-ink-soft/80 pl-12 text-paper placeholder-mist/40 backdrop-blur-2xl outline-none transition-all duration-700 focus:border-teal/50 ${
                      submitted ? 'px-5 py-3 pr-14 text-base' : 'px-8 py-5 pr-16 text-lg sm:text-xl'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isPending || !input.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-teal text-ink-deep transition-colors hover:brightness-110 disabled:opacity-40 ${
                      submitted ? 'p-1.5' : 'p-2.5'
                    }`}
                    aria-label="Search"
                  >
                    <ArrowRight
                      className={`transition-all duration-700 ${
                        submitted ? 'h-4 w-4' : 'h-5 w-5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10"
              >
                {hasError ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-ink-soft/60 p-10 text-center">
                    <TriangleAlert className="h-10 w-10 text-amberglow" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-paper">Search failed</h3>
                    <p className="mt-1 max-w-sm text-sm text-mist">
                      We couldn&apos;t reach the search service. Check your connection and try again.
                    </p>
                    <button
                      type="button"
                      onClick={() => search(input, 'relevance', undefined)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-ink-deep transition-colors hover:brightness-110 focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Try again
                    </button>
                  </div>
                ) : (
                  <AIResultsList
                    results={data?.results ?? []}
                    total={data?.total ?? 0}
                    usedFallback={data?.usedFallback ?? false}
                    isLoading={isPending}
                    query={input}
                    sort={sort}
                    onSortChange={handleSortChange}
                    parsedFilters={data?.parsedFilters}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
