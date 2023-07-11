import { Router } from "express";
import { ContractRequest, User } from "../db/models";
import { ContractRequestParamsValidator, ContractRequestStatusEnum, UserRoles } from "../../shared/types";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";
import { ApplicationError } from "../errors";

const contractsRouter = Router()

contractsRouter.post('/', async (req: RequestWithUser, res) => {
  const data = ContractRequestParamsValidator.parse(req.body)

  const contractRequest = await ContractRequest.create({
    data,
    userId: req.user?.id
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  res.send(contractRequest)
})

contractsRouter.get('/', requireAuthenticated(UserRoles.Faculty), async (req: RequestWithUser, res) => {
  const page = Number(req.query.page) || 0

  const contractRequests = await ContractRequest.findAll({
    include: User,
    limit: 40,
    offset: 40 * page,
    order: [["createdAt", "desc"]]
  })

  return res.send(contractRequests)
})

contractsRouter.get('/:id', requireAuthenticated(UserRoles.AdUser), async (req, res) => {
  const id = req.params.id

  const contractRequest = await ContractRequest.findByPk(id, { include: User, })

  return res.send(contractRequest)
})

contractsRouter.put('/:id', requireAuthenticated(UserRoles.Faculty), async (req, res) => {
  const { id } = req.params
  const status = ContractRequestStatusEnum.parse(req.body.status)

  const contractRequest = await ContractRequest.findByPk(id)

  if (!contractRequest) {
    return ApplicationError.NotFound()
  }

  contractRequest.status = status

  await contractRequest.save()

  return res.send(contractRequest)
})

export default contractsRouter
