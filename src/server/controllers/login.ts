import { Router } from 'express'
import passport from 'passport'

import { PUBLIC_URL } from '../../config'
import { requireAuthenticated } from '../middleware/authentication'
import { RequestWithUser } from '../types'
import { User } from '../db/models'

const loginRouter = Router()

loginRouter.get('/login', requireAuthenticated(), async (req: RequestWithUser, res) => {
  if (!req.loginAs) {
    await User.upsert(req.user!)
  }
  res.send(req.user)
})

loginRouter.get('/oidc', passport.authenticate('oidc'))

loginRouter.get('/callback', passport.authenticate('oidc', { failureRedirect: PUBLIC_URL }), (_, res) => {
  res.redirect(`${PUBLIC_URL}/private`)
})

loginRouter.get('/logout', requireAuthenticated(), async (req: RequestWithUser, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
  })

  res.send({
    url: PUBLIC_URL,
  })
})

export default loginRouter
