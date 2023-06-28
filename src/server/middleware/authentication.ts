import { RequestHandler } from "express";
import { UserParamsValidator } from "../../shared/types";
import { ApplicationError } from "../errors";
import { RequestWithUser } from "../types";
import User from "../db/models/User";
import dayjs from "dayjs";

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
    email: headers.mail
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

export const requireAuthenticated: RequestHandler = (req: RequestWithUser, res, next) => {
  if (!req.user) {
    ApplicationError.Unauthorized()
  }

  next()
}
