import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../Contexts/shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { FullBackendApp } from '@src/apps/shared/backend/FullBackendApp'
import request from 'supertest'
import { EquipoMother } from '../../../../Contexts/EstadisticasFutbol/Equipos/domain/EquipoMother'
import { GetByCriteria } from '../../../shared/backend/routes/criteriaForTest'
import { Equipo } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import { setTimeout } from 'timers/promises'

let environmentArranger: EnvironmentArranger
const applicacion = new FullBackendApp()
let getByCriteria: GetByCriteria<Equipo>

describe('Route /equipos', () => {
      const equipo = EquipoMother.random()
      const equipoToSend: string = JSON.parse(
            JSON.stringify(equipo.toPrimitives())
      )

      beforeAll(async () => {
            await containerIsStarted
            environmentArranger = container.get('ef.shared.environmentArranger')

            await environmentArranger.arrange()
            await applicacion.start()
            getByCriteria = new GetByCriteria(applicacion.httpServer, 'equipos')
      })

      afterAll(async () => {
            await environmentArranger.close()
            await applicacion.stop()
      })

      it('PUT/should save a equipo', async () => {
            const _request = await request(applicacion.httpServer)
                  .put('/equipos')
                  .send(equipoToSend)

            expect(_request.statusCode).toBe(201)
            await setTimeout(1000)
      })

      it('GET/should find a equipo', async () => {
            await getByCriteria.search(
                  [
                        {
                              type: 'match',
                              field: '_id',
                              operator: 'EQUAL',
                              value: equipo.id.value
                        }
                  ],
                  [equipo]
            )
      })
})
