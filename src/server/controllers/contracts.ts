import { Router } from "express";
import { ContractRequest, User } from "../db/models";
import { ContractRequestParamsValidator, ContractRequestStatusEnum, UserRoles } from "../../shared/types";
import { requireAuthenticated } from "../middleware/authentication";
import { RequestWithUser } from "../types";
import { ApplicationError } from "../errors";
import { notifyOnContractRequest } from "../services/notifications";
import { hasRight } from "../../shared/authorizationUtils";
import { Op } from "sequelize";

const contractsRouter = Router()

contractsRouter.post('/', async (req: RequestWithUser, res) => {
  const data = ContractRequestParamsValidator.parse(req.body)

  const contractRequest = await ContractRequest.create({
    data,
    userId: req.user?.id
  })

  await notifyOnContractRequest(contractRequest)

  res.send(contractRequest)
})

contractsRouter.get('/', requireAuthenticated(UserRoles.AdUser), async (req: RequestWithUser, res) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = req.user!

  let contractRequests: ContractRequest[]|undefined

  if (hasRight(user, UserRoles.University)) {
    contractRequests = await ContractRequest.findAll({
      include: User,
      order: [["createdAt", "desc"]]
    })

  } else if (hasRight(user, UserRoles.Faculty)) {
    const codes = user.access?.codes || []

    contractRequests = await ContractRequest.findAll({
      where: {
        data: {
          formData: {
            faculty: {
              [Op.in]: codes
            }
          }
        }
      },
      include: User,
      order: [["createdAt", "desc"]]
    })

  } else { // only AdUser
    contractRequests = await ContractRequest.findAll({
      include: {
        model: User,
        where: {
          id: user.id,
        }
      },
      order: [["createdAt", "desc"]]
    })
  }

  return res.send(contractRequests)
})

contractsRouter.get('/:id', requireAuthenticated(UserRoles.AdUser), async (req, res) => {
  const id = req.params.id

  const contractRequest = await ContractRequest.findByPk(id, { include: User, })

  return res.send(contractRequest)
})

contractsRouter.put('/:id', requireAuthenticated(UserRoles.University), async (req, res) => {
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
