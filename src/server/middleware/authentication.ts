import { RequestHandler } from "express";
import { ShibbolethHeaders, UserParamsValidator } from "../../shared/types";
import { ApplicationError } from "../errors";
import { RequestWithUser } from "../types";
import User from "../db/models/User";

export const getCurrentUser: RequestHandler = async (req: RequestWithUser, res, next) => {
  const headers = req.headers as ShibbolethHeaders

  const userParams = {
    id: headers.hypersonsisuid,
    firstName: headers.givenname,
    lastName: headers.sn,
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
