import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { JugadorCreator } from '../../../../../Contexts/EstadisticasFutbol/Jugadores/application/Create/JugadorCreator'
import { container } from '../../../../shared/backend/dependency-injection'

export default class JugadorPutController implements Controller {
      async run(req: Request, res: Response) {
            const { id, idAntiguo, name } = req.body

            const jugadorRepository = container.get('ef.jugador.repository')
            const jugadorFinder = container.get('ef.jugador.service.searcher')
            const jugadorCreator = new JugadorCreator(
                  jugadorRepository,
                  jugadorFinder
            )

            await jugadorCreator.run({
                  id,
                  idAntiguo,
                  name
            })
            res.status(201).send()
      }
}
