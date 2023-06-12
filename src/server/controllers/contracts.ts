import { Router } from "express";
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

export default contractsRouter