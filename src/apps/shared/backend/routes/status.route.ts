import { Router, Request, Response } from 'express'
import StatusGetController from '../controllers/StatusGetController'

export const register = (router: Router) => {
      const controller: StatusGetController = new StatusGetController()

      router.get('/', (req: Request, res: Response) => controller.run(req, res))

      router.get('/status', (req: Request, res: Response) =>
            controller.run(req, res)
      )
}
