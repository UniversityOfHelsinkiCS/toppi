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
  hygroupcn: '',
}

export const updateMockHeaders = () => {
  localStorage.setItem(ITEM_NAME, JSON.stringify(fakeUser))
}

export const getMockHeaders = () => {
  return JSON.parse(localStorage.getItem(ITEM_NAME) || '{}')
}

export const clearHeaders = () => {
  localStorage.removeItem(ITEM_NAME)
}