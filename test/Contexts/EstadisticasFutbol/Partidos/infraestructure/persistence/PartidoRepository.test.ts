import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import MongoPartidoRepository from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/infraestructure/persistence/MongoPartidoRepository'
import { EnvironmentArranger } from '../../../../shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { PartidoMother } from '../../domain/PartidoMother'
import { partidos } from '../../../shared/domain/setupTest'
import { Criteria } from '../../../../../../src/Contexts/shared/domain/criteria/Criteria'
import { Filters } from '../../../../../../src/Contexts/shared/domain/criteria/filter/Filters'

let environmentArranger: EnvironmentArranger
let repository: MongoPartidoRepository

describe('PartidoRepository', () => {
      const partido = PartidoMother.random()
      beforeAll(async () => {
            await containerIsStarted
            environmentArranger = container.get('ef.shared.environmentArranger')
            repository = container.get('ef.partido.repository')
            await environmentArranger.arrange()
      })

      afterAll(async () => {
            await environmentArranger.close()
      })

      describe('#PartidoRepository', () => {
            it('should #save', async () => {
                  await repository.save(partido)
            })

            it('should #saveMany', async () => {
                  await repository.saveMany(partidos)
            })

            it('Should #matching: // {_id}', async () => {
                  const criteria = new Criteria(
                        Filters.fromValues([
                              {
                                    type: 'match',
                                    field: '_id',
                                    operator: 'EQUAL',
                                    value: partido.id.value
                              }
                        ])
                  )
                  const partidoGuardado = await repository.matching(criteria)
                  expect(partidoGuardado.length).toBe(1)
            })
      })
})
