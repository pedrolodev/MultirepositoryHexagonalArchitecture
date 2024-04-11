import { PartidosByCriteriaSearcher } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/application/SearchByCriteria/PartidosByCriteriaSearcher'
import { PartidoNotFound } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/errors/PartidoNotFound.error'
import { randomArrayElements } from '../../../../../../src/Contexts/shared/infraestructure/utils/Random'
import { partidos } from '../../../shared/domain/setupTest'
import { PartidoMother } from '../../domain/PartidoMother'
import { PartidoRepositoryMock } from '../../__mocks__/PartidoRepositoryMock'
import { MatchFilter } from '@src/Contexts/shared/domain/criteria/filter/categories/MatchFilter'

describe('Find Partido', () => {
      const partidoRepository: PartidoRepositoryMock =
            new PartidoRepositoryMock()
      partidoRepository.returnOnSearch(partidos)
      const partidoFinder: PartidosByCriteriaSearcher =
            new PartidosByCriteriaSearcher(partidoRepository)

      describe('#Find Partido ', () => {
            it('should search a Partido /:id', async () => {
                  const partido = randomArrayElements(partidos, 1)[0]

                  const filters = MatchFilter.fromValues({
                        field: 'id',
                        operator: 'EQUAL',
                        value: partido.id.value
                  }).toPrimitives()

                  const partidoSearched = await partidoFinder.run([filters])
                  partidoRepository.assertMatching()
                  expect([partido.toPrimitives()]).toEqual(partidoSearched)
            })

            it('should return PartidoNotFound Error if id is not found', async () => {
                  const partido = PartidoMother.random()
                  const filters = MatchFilter.fromValues({
                        field: 'id',
                        operator: 'EQUAL',
                        value: partido.id.value
                  }).toPrimitives()

                  await expect(partidoFinder.run([filters])).rejects.toThrow(
                        PartidoNotFound
                  )
            })
      })
})
