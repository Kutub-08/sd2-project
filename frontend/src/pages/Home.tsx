import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, ShieldCheck, Landmark, Sparkles } from 'lucide-react'
import HeroSection from '../components/hero/HeroSection'

const steps = [
  {
    n: '01',
    title: 'Search by area & budget',
    text: 'Pick a neighborhood and the max you want to pay per month in ৳. Filter by bedrooms, bathrooms and size.',
  },
  {
    n: '02',
    title: 'Shortlist verified flats',
    text: 'Save the ones you like. Every listing is posted by a real landlord and carries clear photos and details.',
  },
  {
    n: '03',
    title: 'Message the landlord',
    text: 'Reach out directly from the listing. No broker in the middle, no brokerage hidden in your rent.',
  },
  {
    n: '04',
    title: 'View & move in',
    text: 'Visit the flat, agree on terms, and move in — knowing the rent you saw is the rent you pay.',
  },
]

const features = [
  {
    icon: BadgeCheck,
    title: 'Verified listings',
    text: 'Flats are posted by landlords and checked, so what you see is what is actually available.',
  },
  {
    icon: ShieldCheck,
    title: 'No brokerage',
    text: 'Deal directly with the landlord. You pay the rent — nothing extra on top.',
  },
  {
    icon: Landmark,
    title: 'Rent in ৳, made clear',
    text: 'Monthly prices shown upfront in taka with no hidden service charges or commission.',
  },
  {
    icon: Sparkles,
    title: 'AI-powered search',
    text: 'Describe the flat you want and let our AI suggest listings that actually fit your needs.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-teal">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-base leading-relaxed text-mist">{text}</p>}
    </div>
  )
}

export default function Home() {
  const reduce = useReducedMotion()
  const revealProps = reduce
    ? { initial: undefined, whileInView: undefined, viewport: undefined }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } }

  return (
    <div className="bg-ink">
      <HeroSection />

      {/* How it works — a real sequence, so numbered steps carry meaning */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...revealProps} variants={reveal}>
          <SectionHeading
            eyebrow="How it works"
            title="From search to keys in four steps"
            text="A flat rental is a sequence — so is finding one. Follow the order and you are never guessing."
          />
        </motion.div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              {...revealProps}
              variants={reveal}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <div className="font-display text-5xl font-semibold text-paper/10">
                {step.n}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why To-Let */}
      <section className="border-t border-white/10 bg-ink-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div {...revealProps} variants={reveal}>
            <SectionHeading
              eyebrow="Why To-Let"
              title="The marketplace that takes the broker out of your rent"
            />
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...revealProps}
                variants={reveal}
                transition={{ delay: i * 0.06 }}
                className="group rounded-2xl border border-white/10 bg-ink p-6 transition-colors hover:border-teal/40"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal/30 bg-teal/10 text-teal transition-colors group-hover:bg-teal/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-paper">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Landlord CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          {...revealProps}
          variants={reveal}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-teal/15 via-ink-soft to-ink p-10 text-center sm:p-16"
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-teal">
            For landlords
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Have a flat to rent? Fill it this month.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-mist">
            List your unit in minutes, share its photos, and get inquiries from
            genuine tenants — with no commission taken from your rent.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink-deep transition-all hover:brightness-110 focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none"
            >
              List your flat
            </Link>
            <Link
              to="/listings"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-paper/85 transition-colors hover:border-teal/50 hover:text-teal"
            >
              Browse rentals
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}