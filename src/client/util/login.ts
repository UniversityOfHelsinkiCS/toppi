import { inDevelopment, inE2E, PUBLIC_URL } from '../../config'
import { clearHeaders, updateMockHeaders } from './mockHeaders'

const devLogin = () => {
  clearHeaders()
  updateMockHeaders()
  // window.location.pathname = '/private'
}

export const handleLogin = async () => {
  console.log('Handle login')
  if (inDevelopment || inE2E) return devLogin()

  window.location.href = `${PUBLIC_URL}/api/oidc`
}
