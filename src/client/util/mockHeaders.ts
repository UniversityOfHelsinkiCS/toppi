import { PUBLIC_URL, inTesting } from '../../config'

const ITEM_NAME = 'fakeUser'

const fakeUsers = [
  {
    hypersonsisuid: 'hy-fake-user',
    givenname: 'Topias',
    sn: 'Testaaja',
    mail: 'topias.testaaja@helsinki.fi',
    schacdateofbirth: '19910101',
    shib_logout_url: `${PUBLIC_URL}/`,
    hygroupcn: 'grp-toska',
  },
  {
    hypersonsisuid: 'hy-matlu-handler',
    givenname: 'Matias',
    sn: 'Matlumies',
    mail: 'matias.matlumies@helsinki.fi',
    schacdateofbirth: '19810101',
    shib_logout_url: `${PUBLIC_URL}/`,
    hygroupcn: 'kumpula-student',
  },
] as const

const testUserId = 'hy-fake-user' // do not change (until tests change)

const fakeUserId: typeof fakeUsers[number]["hypersonsisuid"] = 'hy-matlu-handler'

export const updateMockHeaders = () => {
  localStorage.setItem(ITEM_NAME, JSON.stringify(fakeUsers.find(f => f.hypersonsisuid === (inTesting ? testUserId : fakeUserId))))
}

export const getMockHeaders = () => {
  return JSON.parse(localStorage.getItem(ITEM_NAME) || '{}')
}

export const clearHeaders = () => {
  localStorage.removeItem(ITEM_NAME)
}
