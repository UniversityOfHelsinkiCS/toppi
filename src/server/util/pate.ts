/* eslint-disable max-len */
import axios from 'axios'

import { API_TOKEN, PATE_URL } from './config'
import { inDevelopment, inProduction, inTesting } from '../../config'
import { Sentry } from '../middleware/sentry'

const template = {
  from: 'Norppa',
}

const settings = {
  hideToska: false,
  disableToska: true,
  color: '#E3EFFB',
  header: 'Toppi',
  headerFontColor: 'black',
  dryrun: !inProduction,
}

const pateApiClient = axios.create({
  baseURL: PATE_URL,
  params: {
    token: API_TOKEN,
  },
})

type PateRequest = {
  mails: Mail[]
  settings: typeof settings
  template: typeof template
}

const postMail = async (opts: PateRequest) => {
  if (inDevelopment || inTesting) {
    console.log('In development or testing, not sending mail')
    return false
  }

  if (!API_TOKEN) {
    console.log('No API token set, not sending mail')
    return false
  }

  if (!PATE_URL) {
    console.log('No PATE_URL set, not sending mail')
    return false
  }

  try {
    const res = await pateApiClient.post('/', opts)
    if (res.status !== 200) {
      console.log('Pate returned non-200 code:', res.status, res.data)
    }
    Sentry.setTag('pate status', res.status)
    return true
  } catch (error) {
    console.error(error)
    Sentry.setTag('pate status', 'error')
    Sentry.captureException(error)
    return false
  }
}

export type Mail = {
  to: string
  subject: string
  text: string
}

interface Pate {
  sendMail: (mail: Mail) => ReturnType<typeof postMail>
}

export const pateClient: Pate = {
  sendMail(mail: Mail) {
    console.log(`[Pate] sending mail ${mail.subject} to ${mail.to}: \n${mail.text}`)
    return postMail({
      mails: [mail],
      settings,
      template,
    })
  },
}
