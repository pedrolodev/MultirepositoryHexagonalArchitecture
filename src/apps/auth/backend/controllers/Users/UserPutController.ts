import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { container } from '../../../../shared/backend/dependency-injection'
import { UserRegister } from '@src/Contexts/Auth/Users/application/Register/UserRegister'

export default class UserPutController implements Controller {
      async run(req: Request, res: Response) {
            const { id, username, password } = req.body

            const userRepository = container.get('auth.user.repository')

            const userCreator = new UserRegister(userRepository)

            await userCreator.run({
                  id,
                  username,
                  password
            })
            res.status(201).send()
      }
}
