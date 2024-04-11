import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { EquipoByCriteriaSearcher } from '../../../../../Contexts/EstadisticasFutbol/Equipos/application/SearchByCriteria/EquipoByCriteriaSearcher'
import { container } from '../../../../shared/backend/dependency-injection'

export default class EquipoGetController implements Controller {
      async run(req: Request, res: Response) {
            const { body: queryParams } = req
            const { filters, order, limit, offset } = queryParams

            const equipoRepository = container.get('ef.equipo.repository')
            const criteriaSearcher = new EquipoByCriteriaSearcher(
                  equipoRepository
            )

            const response = await criteriaSearcher.run(
                  filters,
                  order,
                  limit ? Number(limit) : undefined,
                  offset ? Number(offset) : undefined
            )
            res.status(200).send(response.map((equipo) => equipo))
      }
}
