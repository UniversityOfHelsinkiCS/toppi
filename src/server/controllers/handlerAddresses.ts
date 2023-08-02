import { Router } from "express";
import { HandlerAddress, User } from "../db/models";
import { HandlerAddressParamsValidator, UserRoles } from "../../shared/types";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";
import { z } from "zod";

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

const getQueryParamsParser = z.object({
  facultyCode: z.string().optional(),
  address: z.string().optional(),
})

handlerAddressRouter.get('/', requireAuthenticated(UserRoles.Admin), async (req: RequestWithUser, res) => {
  const {
    facultyCode,
    address
  } = getQueryParamsParser.parse(req.query)

  const handlerAddresses = await HandlerAddress.findAll({
    include: User,
    where: {
      ...(facultyCode ? { facultyCode } : {}),
      ...(address ? { address } : {}),
    },
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
