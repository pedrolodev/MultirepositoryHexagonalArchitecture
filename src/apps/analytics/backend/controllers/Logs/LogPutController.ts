import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { container } from '../../../../shared/backend/dependency-injection'
import { LogCreator } from '../../../../../../src/Contexts/Analytics/Logs/application/Create/LogCreate'

export default class LogPutController implements Controller {
      async run(req: Request, res: Response) {
            const { id, time, userAgent, ip, project } = req.body

            const logRepository = container.get('analytics.logs.repository')

            const logCreator = new LogCreator(logRepository)

            await logCreator.run({
                  id,
                  time,
                  userAgent,
                  ip,
                  project
            })
            res.status(201).send()
      }
}
