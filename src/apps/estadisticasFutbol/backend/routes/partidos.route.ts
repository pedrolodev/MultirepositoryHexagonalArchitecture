import { Router, Request, Response } from 'express'
import PartidoPutController from '../controllers/Partidos/PartidoPutController'
import { PartidoGetByCriteriaController } from '../controllers/Partidos/PartidoGetController'
import { PartidoGetFiltersController } from '../controllers/Partidos/PartidoGetFiltersController'

export const register = (router: Router) => {
      const partidoPutController = new PartidoPutController()
      router.put('/partidos', (req: Request, res: Response) => partidoPutController.run(req, res))

      const partidoGetByCriteriaController = new PartidoGetByCriteriaController()
      router.get('/partidos', (req: Request, res: Response) => partidoGetByCriteriaController.run(req, res))

      const partidoGetFiltersController = new PartidoGetFiltersController()
      router.get('/partidos/filters', (req: Request, res: Response) => partidoGetFiltersController.run(req, res))
}
