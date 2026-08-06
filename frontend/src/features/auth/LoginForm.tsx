import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { loginSchema, type LoginInput } from '../../schemas/auth.schema'
import { login as loginApi } from '../../api/auth.api'
import { setCredentials } from './authSlice'
import type { AppDispatch } from '../../app/store'
import type { ApiError } from '../../types/api.types'

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    try {
      const res = await loginApi(data)
      dispatch(setCredentials(res.data))
      const role = res.data.user.role
      navigate(role === 'LANDLORD' ? '/landlord/dashboard' : '/dashboard')
    } catch (err: unknown) {
      const message = isAxiosError<ApiError>(err) && err.response?.data?.error?.message
        ? err.response.data.error.message
        : 'Login failed. Please try again.'
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/70">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-white/40 focus:outline-none"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white/70">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-white/40 focus:outline-none"
        />
        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-white/50">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-400 underline hover:text-blue-300">Register</Link>
      </p>
    </form>
  )
}
