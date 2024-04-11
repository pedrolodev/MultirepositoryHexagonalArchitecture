import { Request, Response } from 'express'
import { PartidosByCriteriaSearcher } from '../../../../../Contexts/EstadisticasFutbol/Partidos/application/SearchByCriteria/PartidosByCriteriaSearcher'
import { container } from '../../../../shared/backend/dependency-injection'
import { Controller } from '../../../../shared/backend/controllers/Controller'

export class PartidoGetByCriteriaController implements Controller {
      async run(req: Request, res: Response) {
            const { query } = req
            const { filters, order, limit, offset }: any = query
            const partidoRepository = container.get('ef.partido.repository')
            const criteriaSearcher = new PartidosByCriteriaSearcher(
                  partidoRepository
            )
            const response = await criteriaSearcher.run(
                  filters,
                  order,
                  limit ? Number(limit) : undefined,
                  offset ? Number(offset) : undefined
            )

            res.status(200).send(response.map((partido) => partido))
      }
}
