import { Router } from 'express'
import { RequestWithUser } from '../types'
import { requireAuthenticated } from '../middleware/authentication'
import { UserRoles } from '../../shared/types'
import { User } from '../db/models'
import { Op } from 'sequelize'

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

export default usersRouter
