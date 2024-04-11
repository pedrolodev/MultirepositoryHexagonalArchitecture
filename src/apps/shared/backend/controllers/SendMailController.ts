import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from './Controller'
import { container } from '../dependency-injection'
import { Mailer } from '@src/Contexts/shared/domain/Mailer'

export default class SendMailController implements Controller {
      async run(req: Request, res: Response) {
            const { to, title, message } = req.body

            const mailer: Mailer = container.get('shared.mailer')
            await mailer.sendEmail(to, title, message)

            res.status(httpStatus.OK).send()
      }
}
