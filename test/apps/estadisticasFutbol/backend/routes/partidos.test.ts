import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { FullBackendApp } from '@src/apps/shared/backend/FullBackendApp'
import request from 'supertest'
import { PartidoMother } from '../../../../Contexts/EstadisticasFutbol/Partidos/domain/PartidoMother'
import { setTimeout } from 'timers/promises'
import PartidoMongoArranger from '../../../../Contexts/EstadisticasFutbol/Partidos/infraestructure/persistence/mongo/PartidoMongoArranger'
import { Partido } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/Partido'
import { RandomNumber } from '../../../../../src/Contexts/shared/infraestructure/utils/Random'
import {
      equipos,
      jugadores,
      partidos as partDummies,
      partidosFromCliente
} from '../../../../Contexts/EstadisticasFutbol/shared/domain/setupTest'
import EquipoMongoArranger from '../../../../Contexts/EstadisticasFutbol/Equipos/infraestructure/persistence/mongo/EquipoMongoArranger'
import JugadorMongoArranger from '../../../../Contexts/EstadisticasFutbol/Jugadores/infraestructure/persistence/mongo/JugadorMongoArranger'
import { GetByCriteria } from '../../../shared/backend/routes/criteriaForTest'
import { EnvironmentArranger } from '@test/Contexts/shared/infraestructure/persistence/arranger/EnvironmentArranger'

let environmentArranger: EnvironmentArranger
let partidoArranger: PartidoMongoArranger
let equipoArranger: EquipoMongoArranger
let jugadorArranger: JugadorMongoArranger

const applicacion = new FullBackendApp()
let getByCriteria: GetByCriteria<Partido>

describe('Route /partidos', () => {
      const indicePartidoRandom = RandomNumber(0, partDummies.length)
      const partidoRandom = partDummies[indicePartidoRandom]
      const partidoRandomFromCliente = partidosFromCliente[indicePartidoRandom]

      const partidoWithTemporada = PartidoMother.createWithTemporada(2000)
      const partidoWithJornada = PartidoMother.createWithJornada(10)
      const fechaYear = '2015'
      const fechaMonth = '10'
      const fechaDay = '25'
      const partidoWithFechaYear = PartidoMother.createWithFechaYear(
            fechaYear,
            fechaMonth,
            fechaDay
      )
      const partidos = [
            partidoWithTemporada,
            partidoWithJornada,
            partidoWithFechaYear
      ]
      beforeAll(async () => {
            await containerIsStarted
            environmentArranger = container.get('ef.shared.environmentArranger')
            partidoArranger = container.get('ef.partidos.arranger')
            equipoArranger = container.get('ef.equipos.arranger')
            jugadorArranger = container.get('ef.jugadores.arranger')
            await environmentArranger.arrange()
            await partidoArranger.initConcretData(partidos)
            await equipoArranger.initConcretData(equipos)
            await jugadorArranger.initConcretData(jugadores)
            await applicacion.start()
            getByCriteria = new GetByCriteria(
                  applicacion.httpServer,
                  'partidos'
            )
      })

      afterAll(async () => {
            await environmentArranger.close()
            await applicacion.stop()
      })

      it('PUT/should save a partido', async () => {
            const _request = await request(applicacion.httpServer)
                  .put('/partidos')
                  .send(JSON.parse(JSON.stringify(partidoRandomFromCliente)))

            expect(_request.statusCode).toBe(201)
            await setTimeout(1000)
      })

      it('GET/should find a partido by criteria searching for id', async () => {
            await getByCriteria.search(
                  [
                        {
                              type: 'match',
                              field: '_id',
                              operator: 'EQUAL',
                              value: partidoRandom.id.value
                        }
                  ],
                  [partidoRandom]
            )
      })

      it('GET/should find a partido by criteria searching for jornada', async () => {
            await getByCriteria.search(
                  [
                        {
                              type: 'match',
                              field: 'jornada',
                              operator: 'EQUAL',
                              value: String(partidoWithJornada.jornada.value)
                        },
                        {
                              type: 'match',
                              field: '_id',
                              operator: 'EQUAL',
                              value: partidoWithJornada.id.value
                        }
                  ],
                  [partidoWithJornada]
            )
      })

      it('GET/should find a partido by criteria searching for fecha', async () => {
            await getByCriteria.search(
                  [
                        {
                              type: 'match',
                              field: 'fecha',
                              operator: 'CONTAINS',
                              value: `${fechaYear}-${fechaMonth}-${fechaDay}`
                        }
                  ],
                  [partidoWithFechaYear]
            )
      })

      it('GET/should find a partido by criteria searching for jugador titular', async () => {
            const jugadorRandomPartidoRandom =
                  partidoRandom.equipoLocalTitulares.values[3].value
            await getByCriteria.search(
                  [
                        {
                              type: 'match',
                              field: 'equipoLocalTitulares',
                              operator: 'CONTAINS',
                              value: jugadorRandomPartidoRandom
                        }
                  ],
                  [partidoRandom]
            )
      })
})
