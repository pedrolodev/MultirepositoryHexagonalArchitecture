import { JugadorByCriteriaSearcher } from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/application/SearchByCriteria/JugadorByCriteriaSearcher'
import { JugadorNotExist } from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/errors/JugadorNotExist.error'

import { JugadorMother } from '../../domain/JugadorMother'
import { JugadorRepositoryMock } from '../../__mocks__/JugadorRepositoryMock'

describe('Find Jugador', () => {
      const jugadorRepository = new JugadorRepositoryMock()
      const jugadorFinder = new JugadorByCriteriaSearcher(jugadorRepository)

      describe('#Find Jugador ', () => {
            it('should search a Jugador', async () => {
                  const jugador = JugadorMother.random()
                  jugadorRepository.returnOnSearch([
                        JugadorMother.random(),
                        jugador
                  ])
                  const jugadoresearched = await jugadorFinder.run([
                        {
                              type: 'match',
                              field: 'id',
                              operator: 'EQUAL',
                              value: jugador.id.value
                        }
                  ])
                  jugadorRepository.assertMatching()
                  expect(jugador.toPrimitives()).toEqual(jugadoresearched[0])
            })

            it('should return JugadorNotExist Error if id is not found', async () => {
                  const jugador = JugadorMother.random()
                  await expect(
                        jugadorFinder.run([
                              {
                                    type: 'match',
                                    field: 'id',
                                    operator: 'EQUAL',
                                    value: jugador.id.value
                              }
                        ])
                  ).rejects.toThrow(JugadorNotExist)
            })
      })
})
