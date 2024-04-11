import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { container } from '../../../../shared/backend/dependency-injection'
import { StationCreator } from '../../../../../Contexts/Radio/Stations/application/Create/StationCreator'

export default class StationPutController implements Controller {
      async run(req: Request, res: Response) {
            const { id, name, url, scope } = req.body

            const stationRepository = container.get('radio.station.repository')

            const stationCreator = new StationCreator(stationRepository)

            await stationCreator.run({
                  id,
                  name,
                  url,
                  scope
            })
            res.status(201).send()
      }
}
