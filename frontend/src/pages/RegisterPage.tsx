import { motion } from 'framer-motion'
import RegisterForm from '../features/auth/RegisterForm'
import LightningBackground from '../components/hero/LightningBackground'

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="fixed inset-0 -z-10 opacity-30">
        <LightningBackground />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl"
      >
        <h1 className="mb-6 text-2xl font-bold text-white">Create Account</h1>
        <RegisterForm />
      </motion.div>
    </div>
  )
}
