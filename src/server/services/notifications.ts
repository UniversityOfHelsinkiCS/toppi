import { ContractRequest, HandlerAddress } from '../db/models'
import { Mail, pateClient } from '../util/pate'
import { isDoctoralProgramme } from './organisations'

const createContractRequestNotificationMail = (recipient: string, allHandlers: HandlerAddress[], contractRequest: ContractRequest): Mail => {
  return {
    subject: 'Uusi työsopimuspyyntö!',
    recipient,
    text: `
      Noniiiin uusi työsopimuspyyntö on saatu! Lue se <a href="https://toppi.helsinki.fi/private/contract-requests/${contractRequest.id}">täältä topista</a>. \n
      Tämä ilmoitus lähetettiin osoitteisiin ${allHandlers.map((h) => h.getFullAddress()).join()}
    `,
  }
}

export const notifyOnContractRequest = async (contractRequest: ContractRequest) => {
  const facultyCode = contractRequest.data.formData.faculty
  if (!facultyCode) {
    console.log('Faculty code missing for CR. No notifications will be sent')
  }

  let targetOrganisationCode = facultyCode

  // If programme is doctoral, doctoral organisation handlers will be notified exclusively
  const programmeCode = contractRequest.data.formData.programme
  if (programmeCode && (await isDoctoralProgramme(programmeCode))) {
    targetOrganisationCode = 'doctoral'
  }

  const handlerAddresses = await HandlerAddress.findAll({
    where: {
      facultyCode: targetOrganisationCode,
    },
  })

  // Send mail to each...
  handlerAddresses.forEach((address) => {
    pateClient.sendMail(createContractRequestNotificationMail(address.getFullAddress(), handlerAddresses, contractRequest))
  })
}
