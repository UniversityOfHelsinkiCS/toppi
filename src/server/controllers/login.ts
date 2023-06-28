import { Router } from "express";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";
import User from "../db/models/User";

const loginRouter = Router()

loginRouter.get('/login', requireAuthenticated, async (req: RequestWithUser, res) => {
  const { user, loginAs } = req

  let newUser = false
  if (!loginAs && user) {
    const [, created] = await User.upsert(user)
    newUser = created ?? newUser
  }

  return res.send({
    ...user,
    newUser
  })
})

loginRouter.get('/logout', requireAuthenticated, async (req, res) => {
  const {
    headers: { shib_logout_url: shibLogoutUrl },
  } = req

  return res.send({
    url: shibLogoutUrl,
  })
})

export default loginRouter