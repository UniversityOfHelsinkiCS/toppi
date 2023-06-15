import { Request, Router } from "express";
import ContractRequest from "../db/models/ContractRequest";

const contractsRouter = Router()

contractsRouter.post('/', async (req, res) => {
  console.log(req.body)
  const formData = req.body

  const contractRequest = await ContractRequest.create({
    formData,
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  res.send(contractRequest)
})

contractsRouter.get('/', async (req: Request<{ page?: number }>, res) => {
  const page = req.params.page ?? 0

  const contractRequests = await ContractRequest.findAll({
    limit: 20,
    offset: 20 * page
  })

  return res.send(contractRequests.map(cr => cr.toPublic()))
})

export default contractsRouter