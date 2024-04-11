import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { JugadorByCriteriaSearcher } from '../../../../../Contexts/EstadisticasFutbol/Jugadores/application/SearchByCriteria/JugadorByCriteriaSearcher'
import { container } from '../../../../shared/backend/dependency-injection'

export default class JugadorGetController implements Controller {
      async run(req: Request, res: Response) {
            const { body: queryParams } = req
            const { filters, order, limit, offset } = queryParams

            const jugadorRepository = container.get('ef.jugador.repository')
            const criteriaSearcher = new JugadorByCriteriaSearcher(
                  jugadorRepository
            )

            const response = await criteriaSearcher.run(
                  filters,
                  order,
                  limit ? Number(limit) : undefined,
                  offset ? Number(offset) : undefined
            )
            res.status(200).send(response.map((jugador) => jugador))
      }
}
