import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { BadgeCheck, KeyRound } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { updateProfile } from '../api/users.api'
import { getMe } from '../api/auth.api'
import { updateUser } from '../features/auth/authSlice'
import type { AppDispatch, RootState } from '../app/store'
import { profileSchema, type ProfileInput } from '../schemas/auth.schema'
import type { ApiError } from '../types/api.types'

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (user) {
      reset({ name: user.name, phone: user.phone })
    }
  }, [user, reset])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-mist">
        <p className="font-display text-lg font-medium text-paper">
          Please sign in to view your profile
        </p>
        <Link to="/login" className="mt-4 text-sm text-teal underline underline-offset-4">
          Sign in
        </Link>
      </div>
    )
  }

  const profileUser = user

  async function onSubmit(data: ProfileInput) {
    try {
      await updateProfile(profileUser.id, data)
      const me = await getMe()
      dispatch(updateUser(me.data))
      toast.success('Profile updated')
    } catch (err: unknown) {
      const message =
        isAxiosError<ApiError>(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : 'Could not update your profile. Try again.'
      toast.error(message)
    }
  }

  const initials = profileUser.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">Account</p>
      <h1 className="mb-8 mt-1 font-display text-2xl font-semibold tracking-tight text-paper">
        Profile
      </h1>

      <div className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-teal/40 bg-teal/10 font-display text-lg font-semibold text-teal">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-medium text-paper">
              {user.name}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <Badge variant={user.role === 'LANDLORD' ? 'info' : user.role === 'ADMIN' ? 'warning' : 'default'}>
                {user.role}
              </Badge>
              {user.isVerified ? (
                <span className="inline-flex items-center gap-1 text-xs text-teal">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified email
                </span>
              ) : (
                <Link
                  to="/verify-email"
                  className="inline-flex items-center gap-1 text-xs text-amberglow underline underline-offset-4 hover:text-paper"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  Verify your email
                </Link>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              placeholder="Your full name"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-paper/80">Email</label>
            <input
              id="email"
              value={user.email}
              readOnly
              className="block w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-mist"
            />
            <p className="mt-1 text-xs text-mist">
              Email is your sign-in and can't be changed here.
            </p>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
            Save changes
          </Button>
        </form>
      </div>
    </div>
  )
}