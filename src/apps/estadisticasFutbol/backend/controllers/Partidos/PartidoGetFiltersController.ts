import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { PartidosSearchFilters } from '../../../../../Contexts/EstadisticasFutbol/Partidos/application/SearchFilters/PartidosSearchFilters'

export class PartidoGetFiltersController implements Controller {
      async run(req: Request, res: Response) {
            const criteriaSearcher = new PartidosSearchFilters()
            const filters = await criteriaSearcher.run()

            res.status(200).send(filters)
      }
}
