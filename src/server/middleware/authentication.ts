import { RequestHandler } from "express";
import { ShibbolethHeaders } from "./shibbolethHeaders";
import { UserParamsValidator } from "../../shared/types";
import { ApplicationError } from "../errors";

export const getCurrentUser: RequestHandler = (req, res, next) => {
  const headers = req.headers as ShibbolethHeaders

  const userParams = {
    id: headers.hypersonsisuid,
    firstName: headers.firstname,
    lastName: headers.lastname,
    email: headers.mail
  }

  const user = UserParamsValidator.parse(userParams)

  req.user = user

  next()
}

export const requireAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.user) {
    ApplicationError.Unauthorized()
  }

  next()
}