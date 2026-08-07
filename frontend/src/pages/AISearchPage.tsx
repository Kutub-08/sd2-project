import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import AIResultsList from '../components/ai/AIResultsList'
import AreaPriceResult from '../components/ai/AreaPriceResult'
import { useAIRecommend } from '../hooks/queries/useAIRecommend'
import { useAreaPrice } from '../hooks/queries/useAreaPrice'

type Mode = 'recommend' | 'price'

const PLACEHOLDERS: Record<Mode, string> = {
  recommend: 'Try: "2 bed flat under 15k near IIUC"',
  price: 'Try: "flats in Khulshi under 18000"',
}

export default function AISearchPage() {
  const recommend = useAIRecommend()
  const price = useAreaPrice()
  const [mode, setMode] = useState<Mode>('recommend')
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isPending = mode === 'recommend' ? recommend.isPending : price.isPending

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setSubmitted(true)
    const mutation = mode === 'recommend' ? recommend.mutate : price.mutate
    mutation(trimmed, {
      onError: () => {
        toast.error("Couldn't process that — please try again")
      },
    })
  }

  function switchMode(next: Mode) {
    setMode(next)
    setInput('')
    setSubmitted(false)
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
                {mode === 'recommend' ? 'Search flats in plain English' : 'Check current rents by area'}
              </motion.h1>
              <motion.p
                layout
                className={`text-mist transition-all duration-700 ${
                  submitted ? 'mb-6 text-sm' : 'mb-8 text-base'
                }`}
              >
                {mode === 'recommend'
                  ? 'Describe what you&apos;re looking for and we&apos;ll match it for you'
                  : 'Name an area and see min, average and max rents plus the best flats'}
              </motion.p>
            </motion.div>

            <div className="mx-auto mb-6 flex w-fit gap-1 rounded-full border border-white/10 bg-ink-soft p-1">
              <button
                type="button"
                onClick={() => switchMode('recommend')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
                  mode === 'recommend' ? 'bg-teal text-ink-deep' : 'text-mist hover:text-paper'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Recommend
              </button>
              <button
                type="button"
                onClick={() => switchMode('price')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
                  mode === 'price' ? 'bg-teal text-ink-deep' : 'text-mist hover:text-paper'
                }`}
              >
                <MapPin className="h-3.5 w-3.5" />
                Area prices
              </button>
            </div>

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
                    placeholder={PLACEHOLDERS[mode]}
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
                {mode === 'recommend' ? (
                  <AIResultsList
                    results={recommend.data?.results ?? []}
                    total={recommend.data?.total ?? 0}
                    usedFallback={recommend.data?.usedFallback ?? false}
                    isLoading={recommend.isPending}
                    query={input}
                    parsedFilters={recommend.data?.parsedFilters}
                  />
                ) : (
                  <AreaPriceResult data={price.data} isLoading={price.isPending} />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}