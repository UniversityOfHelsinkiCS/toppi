import { RequestHandler } from "express";
import { UserParamsValidator, UserRole, UserRoles } from "../../shared/types";
import { ApplicationError } from "../errors";
import { RequestUser, RequestWithUser } from "../types";
import User from "../db/models/User";
import dayjs from "dayjs";
import { getUserAccess } from "../services/access";
import { getUserRoles } from "../services/roles";

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

const populateUserRoles = async (user: RequestUser) => {
  let { access, roles } = user

  if (!access) {
    access = await getUserAccess(user)
  }

  if (!roles) {
    roles = getUserRoles(user.id, access)
  }

  user.access = access
  user.roles = roles

  return roles
}

const nameOfRole = (role: UserRole) => Object.entries(UserRoles).filter(([, v]) => v === role)?.[0]?.[0]

export const requireAuthenticated = (minimumRole: UserRole = UserRoles.AdUser) => {

  const authMiddleware: RequestHandler = async (req: RequestWithUser, res, next) => {
    const user = req.user

    if (!user) {
      return ApplicationError.Unauthorized("Must be logged in")
    }

    const roles = await populateUserRoles(user)

    const hasAccess = roles.some(role => role >= minimumRole)

    if (!hasAccess) {
      return ApplicationError.Forbidden(`Must have minimum role of ${nameOfRole(minimumRole)}. Got ${roles.map(nameOfRole)} from IAM-groups ${user.iamGroups}`)
    }

    next()
  }

  return authMiddleware
}
