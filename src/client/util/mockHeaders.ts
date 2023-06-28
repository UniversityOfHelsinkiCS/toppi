import { ShibbolethHeaders } from "../../shared/types"

const ITEM_NAME = 'fakeUser'

const fakeUser: ShibbolethHeaders = {
  hypersonsisuid: 'hy-fake-user',
  givenname: 'Topias',
  sn: 'Testaaja',
  mail: 'topias.testaaja@helsinki.fi',
  schacdateofbirth: '19910101',
}

export const setHeaders = () => {
  localStorage.setItem(ITEM_NAME, JSON.stringify(fakeUser))
}

export const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem(ITEM_NAME) || '{}')
  return user
}

export const clearHeaders = () => {
  localStorage.removeItem(ITEM_NAME)
}
