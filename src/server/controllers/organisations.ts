import { Router } from "express";
import { getOrganisationData } from "../util/jami";

const organisationsRouter = Router()

organisationsRouter.get('/', async (req, res) => {
  const orgs = await getOrganisationData()

  return res.send(orgs)
})

export default organisationsRouter