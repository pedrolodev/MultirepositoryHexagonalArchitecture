import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../Contexts/shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { FullBackendApp } from '@src/apps/shared/backend/FullBackendApp'
import request from 'supertest'
import { JugadorMother } from '../../../../Contexts/EstadisticasFutbol/Jugadores/domain/JugadorMother'
import { Jugador } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/Jugador'
import { GetByCriteria } from '../../../shared/backend/routes/criteriaForTest'

let environmentArranger: EnvironmentArranger
let getByCriteria: GetByCriteria<Jugador>
const applicacion = new FullBackendApp()

describe('Route /jugadores', () => {
      const jugador = JugadorMother.random()
      const jugadorToSend: string = JSON.parse(
            JSON.stringify(jugador.toPrimitives())
      )

      beforeAll(async () => {
            await containerIsStarted
            environmentArranger = container.get('ef.shared.environmentArranger')

            await environmentArranger.arrange()
            await applicacion.start()
            getByCriteria = new GetByCriteria(
                  applicacion.httpServer,
                  'jugadores'
            )
      })

      afterAll(async () => {
            await environmentArranger.close()
            await applicacion.stop()
      })

      it('PUT/should save a jugador', async () => {
            const _request = await request(applicacion.httpServer)
                  .put('/jugadores')
                  .send(jugadorToSend)

            expect(_request.statusCode).toBe(201)
      })

      it('GET/should find a jugador', async () => {
            await getByCriteria.search(
                  [
                        {
                              type: 'match',
                              field: '_id',
                              operator: 'EQUAL',
                              value: jugador.id.value
                        }
                  ],
                  [jugador]
            )
      })

      // TODO
      // corner cases
})
