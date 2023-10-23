import { UserParams } from '../../shared/types'

export const loginAs = (user: UserParams) => {
  localStorage.setItem('toppi-admin-logged-in-as', JSON.stringify(user))
  window.location.reload()
}
