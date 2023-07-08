import { UserParams } from "../../shared/types";
import { getUserOrganisations } from "../util/jami";

export const getUserAccess = async (user: UserParams) => {
  const { id, iamGroups } = user
  if (!iamGroups?.length) return { }

  return getUserOrganisations(id, iamGroups)
}
