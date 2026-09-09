import { describe, it, expect } from 'vitest'
import reducer, { setCredentials, logout, updateUser } from '../src/features/auth/authSlice'
import type { User } from '../src/types/user.types'

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  role: null,
}

const mockUser: User = {
  id: 'u1',
  name: 'Test User',
  email: 'test@test.com',
  phone: '01711111111',
  role: 'TENANT',
  isVerified: true,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

describe('authSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' })
    expect(state).toEqual(initialState)
  })

  it('setCredentials sets user, token, and isAuthenticated', () => {
    const state = reducer(initialState, setCredentials({ user: mockUser, accessToken: 'abc123' }))
    expect(state.user).toEqual(mockUser)
    expect(state.accessToken).toBe('abc123')
    expect(state.isAuthenticated).toBe(true)
    expect(state.role).toBe('TENANT')
  })

  it('setCredentials sets correct role for LANDLORD', () => {
    const landlord = { ...mockUser, role: 'LANDLORD' as const }
    const state = reducer(initialState, setCredentials({ user: landlord, accessToken: 'token' }))
    expect(state.role).toBe('LANDLORD')
    expect(state.isAuthenticated).toBe(true)
  })

  it('logout clears all auth state', () => {
    const authedState = {
      user: mockUser,
      accessToken: 'abc123',
      isAuthenticated: true,
      role: 'TENANT' as const,
    }
    const state = reducer(authedState, logout())
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.role).toBeNull()
  })

  it('logout on already-logged-out state remains safe', () => {
    const state = reducer(initialState, logout())
    expect(state).toEqual(initialState)
  })

  it('updateUser merges fields into the current user', () => {
    const authedState = {
      user: mockUser,
      accessToken: 'abc123',
      isAuthenticated: true,
      role: 'TENANT' as const,
    }
    const state = reducer(authedState, updateUser({ name: 'Renamed', phone: '01800000000' }))
    expect(state.user?.name).toBe('Renamed')
    expect(state.user?.phone).toBe('01800000000')
    expect(state.user?.email).toBe(mockUser.email)
    expect(state.role).toBe('TENANT')
  })

  it('updateUser no-ops when no user is logged in', () => {
    const state = reducer(initialState, updateUser({ name: 'Ghost' }))
    expect(state.user).toBeNull()
  })
})
