import { Router, Request, Response } from 'express'
import EquipoPutController from '../controllers/Equipos/EquipoPutController'
import EquipoGetController from '../controllers/Equipos/EquipoGetController'

export const register = (router: Router) => {
      try {
            const equipoPutController: EquipoPutController =
                  new EquipoPutController()
            router.put('/equipos', (req: Request, res: Response) =>
                  equipoPutController.run(req, res)
            )

            const equipoGetController: EquipoGetController =
                  new EquipoGetController()
            router.get('/equipos', (req: Request, res: Response) =>
                  equipoGetController.run(req, res)
            )
      } catch (e) {
            console.log('Error equipos route')
      }
}
