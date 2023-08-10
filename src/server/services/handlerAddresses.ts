import { Op } from "sequelize"
import { HandlerAddress } from "../db/models"

export const getUserHandlerAddresses = (email: string, iamGroups: string[]) => {
  return HandlerAddress.findAll({
    where: {
      address: {
        [Op.in]: [email, ...iamGroups]
      }
    }
  })
} 