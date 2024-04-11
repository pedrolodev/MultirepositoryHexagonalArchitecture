import { Request, Response } from 'express'
import { container } from '../../../../shared/backend/dependency-injection'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { UserLogin } from '../../../../../../src/Contexts/Auth/Users/application/Login/UserLogin'

export class UserPostByUsername implements Controller {
      async run(req: Request, res: Response) {
            const { body } = req
            const { username, password } = body
            const userRepository = container.get('auth.user.repository')
            const userLogger = new UserLogin(userRepository)
            const response = await userLogger.run(
                  String(username),
                  String(password)
            )

            res.status(200).send(response)
      }
}
