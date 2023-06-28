import { inProduction } from "../../config"
import { logout } from "../api"
import { clearHeaders } from "./mockHeaders"

const devLogout = () => {
  clearHeaders()
  window.location.reload()
}

export const handleLogout = async () => {
  if (!inProduction) devLogout()

  const { url } = await logout()

  if (!url) return

  window.location.href = url
}
