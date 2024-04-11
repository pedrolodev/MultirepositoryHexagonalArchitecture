import { Request, Response } from 'express'
import { Controller } from '../../../../shared/backend/controllers/Controller'
import { PartidoCreator } from '../../../../../Contexts/EstadisticasFutbol/Partidos/application/Create/PartidoCreator'
import { container } from '../../../../shared/backend/dependency-injection'

export default class PartidoPutController implements Controller {
      async run(req: Request, res: Response) {
            const {
                  id,
                  local,
                  visitante,
                  competicion,
                  temporada,
                  jornada,
                  fecha,
                  equipoLocalTitulares,
                  equipoLocalSuplentes,
                  equipoVisitanteTitulares,
                  equipoVisitanteSuplentes,
                  eventos,
                  estadisticas
            } = req.body
            const partidoRepository = container.get('ef.partido.repository')
            const jugadorFinder = container.get('ef.jugador.service.searcher')
            const equipoFinder = container.get('ef.equipo.service.searcher')

            const partidoCreator = new PartidoCreator(
                  partidoRepository,
                  jugadorFinder,
                  equipoFinder
            )

            await partidoCreator.run({
                  id,
                  local,
                  visitante,
                  competicion,
                  temporada,
                  jornada,
                  fecha,
                  equipoLocalTitulares,
                  equipoLocalSuplentes,
                  equipoVisitanteTitulares,
                  equipoVisitanteSuplentes,
                  eventos,
                  estadisticas
            })
            res.status(201).send()
      }
}
