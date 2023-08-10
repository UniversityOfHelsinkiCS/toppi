import { ContractRequest, HandlerAddress } from '../db/models'
import { isDoctoralProgramme } from './organisations'

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
    console.log(`Sending notification to ${address.getFullAddress()}`)
  })
}
