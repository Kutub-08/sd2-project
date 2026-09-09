import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types/user.types'

type AuthState = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  role: User['role'] | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  role: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: User; accessToken: string }>,
    ) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
      state.role = action.payload.user.role
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.role = null
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (!state.user) return
      state.user = { ...state.user, ...action.payload }
      if (action.payload.role) {
        state.role = action.payload.role
      }
    },
  },
})

export const { setCredentials, logout, updateUser } = authSlice.actions
export default authSlice.reducer
