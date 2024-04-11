import { Request, Response, Router } from 'express'
import LogPutController from '../controllers/Logs/LogPutController'

export const register = (router: Router) => {
      try {
            const logPutController = new LogPutController()
            router.put('/logs', (req: Request, res: Response) =>
                  logPutController.run(req, res)
            )
      } catch (e) {
            console.log('error analytics route')
      }
}
