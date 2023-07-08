import axios from 'axios'
import { OrganisationData, UserOrganisationAccess } from '../../shared/types'

const JAMI_URL = process.env.JAMI_URL
const API_TOKEN = process.env.API_TOKEN

export const jamiClient = axios.create({
  baseURL: JAMI_URL,
  params: {
    token: API_TOKEN,
  },
})

let jamiAvailable = false
jamiClient.get('/ping').then(() => {
  jamiAvailable = true
}).catch(() => {
  jamiAvailable = false
  console.error('JAMI not available :( Check your JAMI_URL and API_TOKEN')
})

const get = async (url: string) => {
  if (!jamiAvailable) {
    return undefined
  }
  const { data } = await jamiClient.get(url)
  return data
}

const post = async (url: string, body: any) => {
  if (!jamiAvailable) {
    return undefined
  }
  const { data } = await jamiClient.post(url, body)
  return data
}

export const getOrganisationData = async (): Promise<OrganisationData[]> => {
  const data = await get('/organisation-data')

  return data || []
}

export const getUserOrganisations = async (
  userId: string,
  iamGroups: string[]
): Promise<UserOrganisationAccess> => {

  const data = await post('/', {
    userId,
    iamGroups,
  })

  return data || {}
}
