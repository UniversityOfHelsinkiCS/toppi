import { Router } from "express";
import { ContractRequest, User } from "../db/models";
import { inDevelopment } from "../../config";
import { ContractRequestFormParams, ContractRequestStatusEnum } from "../../shared/types";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";

const contractsRouter = Router()

contractsRouter.post('/', async (req: RequestWithUser, res) => {
  const formData = ContractRequestFormParams.parse(req.body)
  console.log(req.user)
  const contractRequest = await ContractRequest.create({
    formData,
    userId: req.user?.id
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  res.send(contractRequest)
})

contractsRouter.get('/', requireAuthenticated, async (req, res) => {
  const page = Number(req.query.page) || 0

  const contractRequests = await ContractRequest.findAll({
    include: User,
    limit: 40,
    offset: 40 * page,
    order: [["createdAt", "desc"]]
  })

  return res.send(contractRequests)
})

contractsRouter.get('/:id', requireAuthenticated, async (req, res) => {
  const id = req.params.id

  const contractRequest = await ContractRequest.findByPk(id, { include: User, })

  // Absolute tietoturva
  const publicObj = inDevelopment ? contractRequest : contractRequest?.toPublic()

  return res.send(publicObj)
})

contractsRouter.put('/:id', requireAuthenticated, async (req, res) => {
  const { id } = req.params
  const status = ContractRequestStatusEnum.parse(req.body.status)

  const contractRequest = await ContractRequest.findByPk(id)
  if (!contractRequest) {
    throw new Error("NOT FOUND")
  }

  contractRequest.status = status

  await contractRequest.save()

  return res.send(contractRequest)
})

export default contractsRouter
