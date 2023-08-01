import { UserParams, UserRole } from "../../shared/types"

export const hasRight = (user: UserParams, role: UserRole) => {
  return user.roles?.some(r => r >= role)
}