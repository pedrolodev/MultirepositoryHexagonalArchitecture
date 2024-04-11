import { EquipoMother } from '../../domain/EquipoMother'
import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { Repository } from '@src/Contexts/shared/domain/Repository'
import { Equipo } from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import { Criteria } from '../../../../../../src/Contexts/shared/domain/criteria/Criteria'
import { Filters } from '../../../../../../src/Contexts/shared/domain/criteria/filter/Filters'

let repository: Repository<Equipo>
let environmentArranger: EnvironmentArranger

describe('EquipoRepository', () => {
      beforeAll(async () => {
            await containerIsStarted
            repository = container.get('ef.equipo.repository')
            environmentArranger = container.get('ef.shared.environmentArranger')
            await environmentArranger.arrange()
      })

      afterAll(async () => {
            await environmentArranger.close()
      })

      describe('#save', () => {
            const equipos = [
                  EquipoMother.random(),
                  EquipoMother.random(),
                  EquipoMother.random()
            ]
            const equipo = EquipoMother.random()
            it('should save a equipo', async () => {
                  await repository.save(equipo)
            })

            it('should save various equipos', async () => {
                  await repository.saveMany(equipos)
            })

            it('should search a equipo', async () => {
                  const criteria = new Criteria(
                        Filters.fromValues([
                              {
                                    type: 'match',
                                    field: 'name',
                                    operator: 'EQUAL',
                                    value: equipo.name.value
                              }
                        ])
                  )
                  const equipoGuardado = await repository.matching(criteria)
                  expect(equipoGuardado.length).toBe(1)
            })

            it('should search all equipos', async () => {
                  const equiposGuardados = await repository.matching(
                        {} as Criteria
                  )
                  // expect([...equipos, equipo]).toEqual(expect.arrayContaining(equiposGuardados))
                  expect([...equipos, equipo].length).toBe(
                        equiposGuardados.length
                  )
            })
      })
})
