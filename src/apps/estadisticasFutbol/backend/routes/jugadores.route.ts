import { Router, Request, Response } from 'express'
import JugadorPutController from '../controllers/Jugadores/JugadorPutController'
import JugadorGetController from '../controllers/Jugadores/JugadorGetController'

export const register = (router: Router) => {
      const jugadorPutController: JugadorPutController = new JugadorPutController()
      router.put('/jugadores', (req: Request, res: Response) => jugadorPutController.run(req, res))

      const jugadorGetController: JugadorGetController = new JugadorGetController()
      router.get('/jugadores', (req: Request, res: Response) => jugadorGetController.run(req, res))
}
