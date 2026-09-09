import type { User } from './user.types'

export type AdminUser = User & {
  isBanned: boolean
}