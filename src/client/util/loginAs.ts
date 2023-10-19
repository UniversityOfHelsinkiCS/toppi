import { UserParams } from '../../shared/types'

export const loginAs = (user: UserParams) => {
  localStorage.setItem('toppi-logged-in-as', JSON.stringify(user))
  window.location.reload()
}
