import { JugadorMother } from '../../domain/JugadorMother'
import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { Repository } from '@src/Contexts/shared/domain/Repository'
import { Jugador } from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/Jugador'
import { Criteria } from '../../../../../../src/Contexts/shared/domain/criteria/Criteria'
import { Filters } from '../../../../../../src/Contexts/shared/domain/criteria/filter/Filters'

let repository: Repository<Jugador>
let environmentArranger: EnvironmentArranger

describe('JugadorRepository', () => {
      beforeAll(async () => {
            await containerIsStarted
            repository = container.get('ef.jugador.repository')
            environmentArranger = container.get('ef.shared.environmentArranger')
            await environmentArranger.arrange()
      })

      afterAll(async () => {
            await environmentArranger.close()
      })

      describe('#save', () => {
            const jugadores = [JugadorMother.random(), JugadorMother.random()]
            const jugador = jugadores[1]
            it('should save a jugador', async () => {
                  await repository.save(jugadores[0])
                  await repository.save(jugadores[1])
            })

            it('should search a jugador by criteria', async () => {
                  const criteria = new Criteria(
                        Filters.fromValues([
                              {
                                    type: 'match',
                                    field: '_id',
                                    operator: 'EQUAL',
                                    value: jugador.id.value
                              }
                        ])
                  )
                  const jugadorGuardado = await repository.matching(criteria)
                  expect(1).toEqual(jugadorGuardado.length)
            })
      })
})
