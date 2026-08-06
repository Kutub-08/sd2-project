import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LightningBackground from './LightningBackground'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const stats = [
  { label: 'Listings', value: '1,200+' },
  { label: 'Landlords', value: '480+' },
  { label: 'Cities Covered', value: '12' },
  { label: 'Happy Tenants', value: '3,500+' },
]

export default function HeroSection({ hue = 220 }: { hue?: number }) {
  const navigate = useNavigate()
  const [area, setArea] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (area.trim()) params.set('area', area.trim())
    if (maxPrice) params.set('maxPrice', maxPrice)
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      <LightningBackground hue={hue} />



      {/* Hero Content */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          Find Your Next Flat
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-base text-white/60 sm:text-lg"
          variants={itemVariants}
        >
          Search verified listings by price, location, and room count — no brokers, no guesswork.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          variants={itemVariants}
        >
          <input
            type="text"
            placeholder="Area or neighborhood"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur outline-none transition-colors focus:border-white/40"
          />
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur outline-none transition-colors focus:border-white/40 sm:w-40"
          >
            <option value="" className="bg-gray-900 text-white">Max Price</option>
            <option value="5000" className="bg-gray-900 text-white">৳5,000</option>
            <option value="10000" className="bg-gray-900 text-white">৳10,000</option>
            <option value="15000" className="bg-gray-900 text-white">৳15,000</option>
            <option value="25000" className="bg-gray-900 text-white">৳25,000</option>
            <option value="35000" className="bg-gray-900 text-white">৳35,000</option>
            <option value="50000" className="bg-gray-900 text-white">৳50,000</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-white/90"
          >
            Search
          </button>
        </motion.form>

        {/* Stats Row */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-12"
          variants={itemVariants}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-10" variants={itemVariants}>
          <Link
            to="/listings"
            className="inline-block rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:border-white/40 hover:text-white"
          >
            Browse Listings
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
