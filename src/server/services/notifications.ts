import { PUBLIC_URL } from '../../config'
import { ContractRequest, HandlerAddress } from '../db/models'
import { Sentry } from '../middleware/sentry'
import { Mail, pateClient } from '../util/pate'
import { isDoctoralProgramme } from './organisations'

const createContractRequestNotificationMail = (recipient: string, allHandlers: HandlerAddress[], contractRequest: ContractRequest): Mail => {
  return {
    subject: `${contractRequest.isTest ? '(Testi) ' : ''}Uusi työsopimuspyyntö!`,
    to: recipient,
    text: `
      Uusi työsopimuspyyntö saatu käyttäjältä ${contractRequest.data.formData.email}.\n
      <a href="${PUBLIC_URL}/private/contract-requests/${contractRequest.id}">Lue se Topista.</a> \n\n
      Tämä ilmoitus lähetettiin osoitteisiin ${allHandlers.map((h) => h.getFullAddress()).join(', ')}
      Olet saajalistalla, koska ${recipient} on merkitty käsittelijäosoitteeksi tiedekunnalle ${contractRequest.data.formData.faculty}.
      Ota yhteyttä tukeen <a href="mailto:grp-toska@helsinki.fi">grp-toska@helsinki.fi</a> jos kyseessä on virhe.
    `,
  }
}

export const notifyOnContractRequest = async (contractRequest: ContractRequest) => {
  const facultyCode = contractRequest.data.formData.faculty
  if (!facultyCode && !contractRequest.isTest) {
    console.log('Faculty code missing for CR. No notifications will be sent')
  }

  let targetOrganisationCode = facultyCode

  // If programme is doctoral, doctoral organisation handlers will be notified exclusively
  const programmeCode = contractRequest.data.formData.programme
  if (programmeCode && (await isDoctoralProgramme(programmeCode))) {
    targetOrganisationCode = 'doctoral'
  }

  // If contract request is marked as test, only send to testers
  if (contractRequest.isTest) {
    targetOrganisationCode = 'testers'
  }

  const handlerAddresses = await HandlerAddress.findAll({
    where: {
      facultyCode: targetOrganisationCode,
    },
  })

  if (handlerAddresses.length === 0) {
    console.log(`No handler addresses found for faculty ${targetOrganisationCode}. No notifications will be sent`)
    if (!contractRequest.isTest) {
      Sentry.captureMessage(`Contract request from ${contractRequest.data.formData.email}. No handler addresses found for faculty ${targetOrganisationCode}. No notifications will be sent`)
    }
    return false
  }

  // Send mail to each...
  const sentCount = (
    await Promise.all(handlerAddresses.map((address) => pateClient.sendMail(createContractRequestNotificationMail(address.getFullAddress(), handlerAddresses, contractRequest))))
  ).filter((sent) => sent).length

  Sentry.captureMessage(`${contractRequest.isTest ? 'TEST ' : ''} Contract request from ${contractRequest.data.formData.email} sent to ${sentCount} handlers`)

  return true
}
