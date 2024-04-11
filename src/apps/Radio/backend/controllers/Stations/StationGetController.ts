import { Request, Response } from 'express'
import { container } from '../../../../shared/backend/dependency-injection'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { StatonByCriteriaSearcher } from '../../../../../Contexts/Radio/Stations/application/SearchByCriteria/StationByCriteriaSearcher'

export class StationGetByCriteriaController implements Controller {
      async run(req: Request, res: Response) {
            const { query } = req
            const { filters, order, limit, offset }: any = query
            const stationRepository = container.get('radio.station.repository')
            const criteriaSearcher = new StatonByCriteriaSearcher(
                  stationRepository
            )

            const response = await criteriaSearcher.run(
                  filters,
                  JSON.parse(order),
                  limit ? Number(limit) : undefined,
                  offset ? Number(offset) : undefined
            )

            res.status(200).send(response.map((station) => station))
      }
}
