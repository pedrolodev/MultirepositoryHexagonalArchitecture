import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { EquipoCreator } from '../../../../../Contexts/EstadisticasFutbol/Equipos/application/Create/EquipoCreator'
import { container } from '../../../../shared/backend/dependency-injection'

export default class EquipoPutController implements Controller {
      async run(req: Request, res: Response) {
            const { id, idAntiguo, name } = req.body

            const equipoRepository = container.get('ef.equipo.repository')
            const equipoServiceSearcher = container.get(
                  'ef.equipo.service.searcher'
            )
            const equipoCreator = new EquipoCreator(
                  equipoRepository,
                  equipoServiceSearcher
            )

            await equipoCreator.run({
                  id,
                  idAntiguo,
                  name
            })
            res.status(201).send()
      }
}
