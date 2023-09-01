import { UserParams, UserRoles } from '../../shared/types'
import { ContractRequest } from '../db/models'
import { RequestUser } from '../types'
import { getUserOrganisations } from '../util/jami'
import { getUserHandlerAddresses } from './handlerAddresses'

export const getUserAccess = async (user: UserParams) => {
  const { id, iamGroups } = user

  if (!iamGroups)
    return {
      specialGroups: {},
      codes: [],
    }

  const [jamiAccess, handlerAddresses] = await Promise.all([getUserOrganisations(id, iamGroups), getUserHandlerAddresses(user.email, iamGroups)])

  // we dont actually give a fuck about jami organisation access, only the special groups...
  return {
    specialGroups: jamiAccess.specialGroup ?? {},
    codes: handlerAddresses.map((adr) => adr.facultyCode), // maybe check that no duplicates?
  }
}

export const getUserAccessTo = (user: RequestUser, contractRequest: ContractRequest) => {
  if (user.access?.codes.includes(contractRequest.data.formData.faculty)) {
    return 'write'
  }
  if (user.email === contractRequest.data.formData.email) {
    return 'read'
  }
  if (user.roles?.includes(UserRoles.Admin)) {
    return 'admin'
  }
  return null
}
