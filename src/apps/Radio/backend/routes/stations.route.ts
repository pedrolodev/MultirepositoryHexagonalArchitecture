import { Request, Response, Router } from 'express'
import { StationGetByCriteriaController } from '../controllers/Stations/StationGetController'
import StationPutController from '../controllers/Stations/StationPutController'

export const register = (router: Router) => {
      try {
            const stationGetController = new StationGetByCriteriaController()
            router.get('/stations', (req: Request, res: Response) =>
                  stationGetController.run(req, res)
            )

            const stationPutController = new StationPutController()
            router.put('/stations', (req: Request, res: Response) =>
                  stationPutController.run(req, res)
            )
      } catch (e) {
            console.log('Error stations route')
      }
}
