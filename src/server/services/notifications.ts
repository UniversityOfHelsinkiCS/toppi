import { ContractRequest, HandlerAddress } from '../db/models'
import { Sentry } from '../middleware/sentry'
import { Mail, pateClient } from '../util/pate'
import { isDoctoralProgramme } from './organisations'

const createContractRequestNotificationMail = (recipient: string, allHandlers: HandlerAddress[], contractRequest: ContractRequest): Mail => {
  return {
    subject: 'Uusi työsopimuspyyntö!',
    to: recipient,
    text: `
      Noniiiin uusi työsopimuspyyntö on saatu! Lue se <a href="https://toppi.helsinki.fi/private/contract-requests/${contractRequest.id}">täältä topista</a>. \n
      Tämä ilmoitus lähetettiin osoitteisiin ${allHandlers.map((h) => h.getFullAddress()).join()}
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

  Sentry.captureMessage(`Contract request from ${contractRequest.data.formData.email} sent to ${sentCount} handlers`)

  return true
}
