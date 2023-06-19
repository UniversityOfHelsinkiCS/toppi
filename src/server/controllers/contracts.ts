import { Router } from "express";
import ContractRequest from "../db/models/ContractRequest";
import { inDevelopment } from "../../config";
import { ContractRequestFormParams, ContractRequestStatusEnum } from "../../shared/types";

const contractsRouter = Router()

contractsRouter.post('/', async (req, res) => {
  const formData = ContractRequestFormParams.parse(req.body)

  const contractRequest = await ContractRequest.create({
    formData,
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  res.send(contractRequest)
})

contractsRouter.get('/', async (req, res) => {
  const page = Number(req.query.page) || 0

  const contractRequests = await ContractRequest.findAll({
    limit: 20,
    offset: 20 * page
  })

  return res.send(contractRequests.map(cr => cr.toPublic()))
})

contractsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const contractRequest = await ContractRequest.findByPk(id)

  // Absolute tietoturva
  const publicObj = inDevelopment ? contractRequest : contractRequest?.toPublic()

  return res.send(publicObj)
})

contractsRouter.put('/:id', async (req, res) => {
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