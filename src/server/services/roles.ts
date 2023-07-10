import { UserOrganisationAccess, UserRole, UserRoles } from "../../shared/types";

type RoleName = keyof typeof UserRoles

const roleNames = Object.keys(UserRoles) as RoleName[]
const ExtraRoles = Object.fromEntries(roleNames.map(r => [r, []] as [RoleName, string[]])) as { [role in RoleName]: string[] }

/**
 * Load custom given roles from env. Ids are separated by ;. 
 * Env keys are uppercased role name + '_ROLE'
 * Example: ADMIN_ROLE=user-id-for-admin-1;user-id-for-admin-2
 */
const loadExtraUserRoles = () => {

  const emptyEnvs: string[] = []

  let key: RoleName
  for (key in ExtraRoles) {
    const envName = `${key.toUpperCase()}_ROLE`
    const envValue = process.env[envName]
    const userIds = envValue?.split(';')
  
    if (!userIds || userIds.length === 0) {
      emptyEnvs.push(envName)
      continue
    }


    ExtraRoles[key] = userIds
  }

  console.log(`No extra roles grants defined for roles: ${emptyEnvs}`)
}

loadExtraUserRoles()

export const getUserRoles = (userId: string, access: UserOrganisationAccess) => {
  const roles: UserRole[] = [UserRoles.AdUser]

  if (access.specialGroup?.kosu) {
    roles.push(UserRoles.Faculty)
  }

  // Todo who gets UserRole.University?

  if (access.specialGroup?.superAdmin) {
    roles.push(UserRoles.Admin)
  }

  // Give extra roles
  let key: RoleName
  for (key in ExtraRoles) {
    if (ExtraRoles[key].includes(userId)) {
      roles.push(UserRoles[key])
    }
  }

  return roles
}
