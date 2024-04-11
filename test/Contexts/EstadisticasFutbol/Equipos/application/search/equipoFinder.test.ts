import { EquipoByCriteriaSearcher } from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/application/SearchByCriteria/EquipoByCriteriaSearcher'
import { EquipoNotExist } from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/errors/EquipoNotExist.error'

import { EquipoMother } from '../../domain/EquipoMother'
import { EquipoRepositoryMock } from '../../__mocks__/EquipoRepositoryMock'

describe('Find Equipo', () => {
      const equipoRepository = new EquipoRepositoryMock()
      const equipoFinder = new EquipoByCriteriaSearcher(equipoRepository)

      describe('#Find Equipo ', () => {
            it('should search a Equipo', async () => {
                  const equipo = EquipoMother.random()
                  equipoRepository.returnOnSearch([
                        EquipoMother.random(),
                        equipo
                  ])
                  const equiposearched = await equipoFinder.run([
                        {
                              type: 'match',
                              field: 'id',
                              operator: 'EQUAL',
                              value: equipo.id.value
                        }
                  ])
                  equipoRepository.assertMatching()
                  expect(equipo.toPrimitives()).toEqual(equiposearched[0])
            })

            it('should return EquipoNotExist Error if id is not found', async () => {
                  const equipo = EquipoMother.random()
                  await expect(
                        equipoFinder.run([
                              {
                                    type: 'match',
                                    field: 'id',
                                    operator: 'EQUAL',
                                    value: equipo.id.value
                              }
                        ])
                  ).rejects.toThrow(EquipoNotExist)
            })
      })
})
