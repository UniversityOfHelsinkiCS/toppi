import { PUBLIC_URL } from "../../config"
import { ShibbolethHeaders } from "../../shared/types"

const ITEM_NAME = 'fakeUser'

const fakeUser: ShibbolethHeaders = {
  hypersonsisuid: 'hy-fake-user',
  givenname: 'Topias',
  sn: 'Testaaja',
  mail: 'topias.testaaja@helsinki.fi',
  schacdateofbirth: '19910101',
  shib_logout_url: `${PUBLIC_URL}/`,
  hygroupcn: 'hy-ypa-opa-kosu-kumpula',
}

export const setHeaders = () => {
  localStorage.setItem(ITEM_NAME, JSON.stringify(fakeUser))
}

export const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem(ITEM_NAME) || '{}')
  if (user.sn) {
    return user as ShibbolethHeaders
  }
  return undefined
}

export const clearHeaders = () => {
  localStorage.removeItem(ITEM_NAME)
}
