import { inDevelopment, inE2E, PUBLIC_URL } from '../../config'
import { clearHeaders } from './mockHeaders'

const devLogin = () => {
  clearHeaders()
  window.location.pathname = '/private'
}

export const handleLogin = async () => {
  if (inDevelopment || inE2E) return devLogin()

  window.location.href = `${PUBLIC_URL}/api/oidc`.replace('//', '/')
}
