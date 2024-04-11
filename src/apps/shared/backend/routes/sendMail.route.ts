import { Router, Request, Response } from 'express'
import SendMailController from '../controllers/SendMailController'

export const register = (router: Router) => {
      const controller: SendMailController = new SendMailController()
      router.post('/sendmail', (req: Request, res: Response) =>
            controller.run(req, res)
      )
}
