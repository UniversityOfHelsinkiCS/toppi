import axios from 'axios'
import { OrganisationData, UserOrganisationAccess } from '../../shared/types'
import { API_TOKEN, JAMI_URL } from './config'
import { inTesting } from '../../config'

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

const post = async (url: string, body: object) => {
  if (!jamiAvailable) {
    return undefined
  }
  const { data } = await jamiClient.post(url, body)
  return data
}


const mockJami = {
  getOrganisations(): OrganisationData[] {
    return [
      {
        code: 'H50',
        name: {
          fi: 'Matemaattis-luonnontieteellinen tiedekunta',
          en: 'Faculty of Science',
          sv: 'Matematisk-naturvetenskapliga fakulteten',
        },
        programmes: [
          {
            key: 'KH50_001',
            name: {
              fi: 'Matemaattisten tieteiden kandiohjelma',
              en: "Bachelor's Programme in Mathematical Sciences",
              sv: 'Kandidatsprogrammet i matematiska vetenskaper',
            },
            level: 'bachelor',
            companionFaculties: [],
            international: false,
          },
        ]
      }
    ]
  }
}

/**
 * High-performance caching solution:
 */ 
let organisationData: OrganisationData[]|null = null

export const getOrganisationData = async (): Promise<OrganisationData[]> => {
  if (organisationData) return organisationData

  const data = inTesting ? mockJami.getOrganisations() : await get('/organisation-data')

  if (data) {
    organisationData = data
  }

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
