import { Router } from "express";
import { ContractRequest, User } from "../db/models";
import { inDevelopment } from "../../config";
import { ContractRequestFormParams, ContractRequestStatusEnum } from "../../shared/types";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";
import { ApplicationError } from "../errors";
import { getUserAccess } from "../services/access";

const contractsRouter = Router()

contractsRouter.post('/', async (req: RequestWithUser, res) => {
  const formData = ContractRequestFormParams.parse(req.body)

  const contractRequest = await ContractRequest.create({
    formData,
    userId: req.user?.id
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  res.send(contractRequest)
})

contractsRouter.get('/', requireAuthenticated("kosu"), async (req: RequestWithUser, res) => {
  const page = Number(req.query.page) || 0

  const access = await getUserAccess(req.user!)
  console.log(access)

  const contractRequests = await ContractRequest.findAll({
    include: User,
    limit: 40,
    offset: 40 * page,
    order: [["createdAt", "desc"]]
  })

  return res.send(contractRequests)
})

contractsRouter.get('/:id', requireAuthenticated("kosu"), async (req, res) => {
  const id = req.params.id

  const contractRequest = await ContractRequest.findByPk(id, { include: User, })

  return res.send(contractRequest)
})

contractsRouter.put('/:id', requireAuthenticated("kosu"), async (req, res) => {
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
