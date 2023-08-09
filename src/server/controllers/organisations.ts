import { Router } from "express";
import { getOrganisations } from "../services/organisations";

const organisationsRouter = Router()

organisationsRouter.get('/', async (req, res) => {
  const orgs = await getOrganisations()

  return res.send(orgs)
})

export default organisationsRouter