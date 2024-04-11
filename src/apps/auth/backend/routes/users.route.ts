import { Request, Response, Router } from 'express'
import { UserPostByUsername } from '../controllers/Users/UserPostController'
import UserPutController from '../controllers/Users/UserPutController'

export const register = (router: Router) => {
      try {
            const userPostController = new UserPostByUsername()
            router.post('/users', (req: Request, res: Response) =>
                  userPostController.run(req, res)
            )

            const userPutController = new UserPutController()
            router.put('/users', (req: Request, res: Response) =>
                  userPutController.run(req, res)
            )
      } catch (e) {
            console.log('Error auth route')
      }
}
