import { UserParams } from '../../shared/types'
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
