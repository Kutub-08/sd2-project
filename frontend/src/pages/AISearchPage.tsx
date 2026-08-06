import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import LightningBackground from '../components/hero/LightningBackground'
import AIResultsList from '../components/ai/AIResultsList'
import { useAIRecommend } from '../hooks/queries/useAIRecommend'

export default function AISearchPage() {
  const { data, mutate, isPending } = useAIRecommend()
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setSubmitted(true)
    mutate(trimmed, {
      onError: () => {
        toast.error("Couldn't understand that — showing keyword results instead")
      },
    })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{ opacity: submitted ? 0.2 : 0.6 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <LightningBackground />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div
          className={`transition-all duration-700 ${
            submitted ? 'pt-16' : 'flex min-h-screen items-center justify-center'
          }`}
        >
          <div className="w-full max-w-3xl">
            <motion.div layout className="text-center">
              <motion.h1
                layout
                className={`font-bold text-white transition-all duration-700 ${
                  submitted ? 'mb-1 text-2xl' : 'mb-3 text-4xl sm:text-5xl'
                }`}
              >
                AI-Powered Search
              </motion.h1>
              <motion.p
                layout
                className={`text-white/50 transition-all duration-700 ${
                  submitted ? 'mb-6 text-sm' : 'mb-8 text-base'
                }`}
              >
                Describe what you&apos;re looking for in plain English
              </motion.p>
            </motion.div>

            <motion.form
              layout
              onSubmit={handleSubmit}
              className="mx-auto"
            >
              <div
                className={`relative mx-auto transition-all duration-700 ${
                  submitted ? 'max-w-2xl' : 'max-w-full'
                }`}
              >
                <div className="relative w-full">
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-all duration-700 ${
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
                    className={`w-full rounded-2xl border border-white/20 bg-white/10 pl-12 text-white placeholder-white/30 backdrop-blur-2xl outline-none transition-all duration-700 focus:border-white/40 ${
                      submitted
                        ? 'px-5 py-3 pr-14 text-base'
                        : 'px-8 py-5 pr-16 text-lg sm:text-xl'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isPending || !input.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/15 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/25 disabled:opacity-30 ${
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
                <AIResultsList
                  results={data?.results ?? []}
                  total={data?.total ?? 0}
                  usedFallback={data?.usedFallback ?? false}
                  isLoading={isPending}
                  query={input}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
