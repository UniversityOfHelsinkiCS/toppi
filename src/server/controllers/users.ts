import { Router } from 'express'
import { RequestWithUser } from '../types'
import { requireAuthenticated } from '../middleware/authentication'
import { UserData, UserRoles } from '../../shared/types'
import { User } from '../db/models'
import { Op } from 'sequelize'
import { ApplicationError } from '../errors'
import { getUserAccess } from '../services/access'
import { getUserRoles } from '../services/roles'
import { getUserInfo } from '../util/jami'

const usersRouter = Router()

usersRouter.get('/', requireAuthenticated(UserRoles.Admin), async (req: RequestWithUser, res) => {
  const email = (req.query.email ?? '') as string

  const users = await User.findAll({
    where: {
      email: {
        [Op.iLike]: `%${email}%`,
      },
    },
  })

  res.send(users)
})

usersRouter.get('/:id', requireAuthenticated(UserRoles.Admin), async (req: RequestWithUser, res) => {
  const id = req.params.id

  const user = await User.findByPk(id)
  if (!user) {
    return ApplicationError.NotFound()
  }
  const userJson = user.toJSON() as UserData
  const { iamGroups } = await getUserInfo(id)
  userJson.iamGroups = iamGroups
  const access = await getUserAccess(userJson)
  userJson.roles = getUserRoles(userJson.email, access)

  res.send(userJson)
})

export default usersRouter
