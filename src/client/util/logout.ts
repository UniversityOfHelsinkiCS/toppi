import { inProduction } from '../../config'
import { logout } from '../api'
import { clearHeaders } from './mockHeaders'

const devLogout = () => {
  clearHeaders()
  window.location.pathname = '/'
}

export const handleLogout = async () => {
  if (!inProduction) return devLogout()

  const { url } = await logout()

  if (!url) return

  window.location.href = url
}
