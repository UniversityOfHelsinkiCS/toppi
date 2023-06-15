import { Router } from "express";
import contractsRouter from "./controllers/contracts";

const router = Router()

router.get('/ping', (_, res) => { res.send('pong')  })

router.use('/contract-requests', contractsRouter)

router.use('/', (_, res) => res.sendStatus(404))

export default router