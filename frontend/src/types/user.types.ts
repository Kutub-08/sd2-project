export type UserRole = 'TENANT' | 'LANDLORD' | 'ADMIN'

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export type AuthState = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  role: UserRole | null
}
