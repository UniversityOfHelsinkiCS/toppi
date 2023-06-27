import { Router } from "express";
import contractsRouter from "./controllers/contracts";
import loginRouter from "./controllers/login";

/**
 * apiRouter handles the business side of requests. 
 * The requests it receives may or may not be authenticated, 
 * so the controllers/subsequent middleware must check for user themselves.
 */
const apiRouter = Router()
apiRouter.use('/contract-requests', contractsRouter)
apiRouter.use('/', loginRouter)
apiRouter.use('/', (_req, res) => res.sendStatus(404))

export { apiRouter }
