import { RequestHandler } from "express";
import { ShibbolethHeaders } from "./shibbolethHeaders";

export const getCurrentUser: RequestHandler = (req, res, next) => {
  const { uid: username } = req.headers as ShibbolethHeaders
  console.log(username)
  // TODO add user to req
  next()
}

export const requireAuthenticated: RequestHandler = (req, res, next) => {
  // TODO check for user
  next()
}
