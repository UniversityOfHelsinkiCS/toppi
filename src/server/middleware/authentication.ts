import { RequestHandler } from "express";
import { SpecialGroup, UserParamsValidator } from "../../shared/types";
import { ApplicationError } from "../errors";
import { RequestWithUser } from "../types";
import User from "../db/models/User";
import dayjs from "dayjs";
import { getUserAccess } from "../services/access";

const parseShibDateOfBirth = (dob: string|undefined) => {
  const parsed = dob ? dayjs(dob, 'YYYYMMDD', true).format('YYYY-MM-DD') : dob
  return parsed
}

export const getCurrentUser: RequestHandler = async (req: RequestWithUser, res, next) => {
  const { headers } = req

  const userParams = {
    id: headers.hypersonsisuid,
    firstName: headers.givenname,
    lastName: headers.sn,
    birthDate: parseShibDateOfBirth(headers.schacdateofbirth),
    email: headers.mail,
    iamGroups: headers.hygroupcn?.split(";"),
  }

  const user = UserParamsValidator.parse(userParams)

  req.user = user

  const loginAsId = req.headers['x-admin-logged-in-as']
  if (typeof loginAsId === "string") {
    const loggedInAsUser = await User.findByPk(loginAsId)
    if (loggedInAsUser) {
      req.user = loggedInAsUser
      req.loginAs = true
    }
  }

  next()
}



export const requireAuthenticated = (...specialGroups: SpecialGroup[]) => {

  const authMiddleware: RequestHandler = async (req: RequestWithUser, res, next) => {
    const user = req.user

    if (!user) {
      return ApplicationError.Unauthorized("Must be logged in")
    }

    if (!user.access) {
      user.access = await getUserAccess(user)
      console.log(user.access)
    }

    if (!specialGroups.every(group => user.access!.specialGroup?.[group])) {
      return ApplicationError.Forbidden(`Must have special group(s) ${specialGroups.join(", ")}. Got ${JSON.stringify(user.access?.specialGroup)} from IAM-groups ${user.iamGroups}`)
    }

    next()
  }

  return authMiddleware
}
