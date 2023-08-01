import { Router } from "express";
import { HandlerAddress, User } from "../db/models";
import { HandlerAddressParamsValidator, UserRoles } from "../../shared/types";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";

const handlerAddressRouter = Router()

handlerAddressRouter.post('/', requireAuthenticated(UserRoles.Admin), async (req: RequestWithUser, res) => {
  const creationParams = HandlerAddressParamsValidator.parse(req.body)
  console.log(creationParams)
  const handlerAddress = await HandlerAddress.create({
    ...creationParams,
    addedById: req.user?.id
  })

  res.send(handlerAddress)
})

handlerAddressRouter.get('/', requireAuthenticated(UserRoles.Admin), async (req: RequestWithUser, res) => {
  const handlerAddresses = await HandlerAddress.findAll({
    include: User,
  })

  return res.send(handlerAddresses)
})

handlerAddressRouter.delete('/:id', requireAuthenticated(UserRoles.Admin), async (req: RequestWithUser, res) => {
  await HandlerAddress.destroy({
    where: {
      id: req.params.id,
    }
  })

  return res.sendStatus(201)
})

export default handlerAddressRouter
