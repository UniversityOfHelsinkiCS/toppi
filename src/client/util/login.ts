import { inProduction } from '../../config'
import { clearHeaders } from './mockHeaders'

const devLogin = () => {
  clearHeaders()
  window.location.pathname = '/private'
}

export const handleLogin = async () => {
  if (!inProduction) return devLogin()

  window.location.href = `${window.location.href}/api/oidc`
}
