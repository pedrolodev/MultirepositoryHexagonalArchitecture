import { JugadorCreator } from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/application/Create/JugadorCreator'
import { UuidNotValid } from '../../../../../../src/Contexts/shared/domain/value-object/UuidNotValid.error'
import { jugadores } from '../../../shared/domain/setupTest'
import { JugadorMother } from '../../domain/JugadorMother'
import { JugadorRepositoryMock } from '../../__mocks__/JugadorRepositoryMock'
import { JugadorExists } from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/errors/JugadorExists.error'
import JugadorFinder from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/services/JugadorFinder'

describe('Create Jugador', () => {
      const jugadorRepository = new JugadorRepositoryMock()
      jugadorRepository.returnOnSearch(jugadores)
      const jugadorFinder = new JugadorFinder(jugadorRepository)
      const jugadorCreator = new JugadorCreator(
            jugadorRepository,
            jugadorFinder
      )

      describe('#Create Jugador ', () => {
            it('should create a valid Jugador', async () => {
                  const jugador = JugadorMother.random()
                  await jugadorCreator.run(jugador.toPrimitives())
                  jugadorRepository.assertSaveHaveBeenCalledWith(jugador)
            })

            it('should return UUidNotValid Error if id is invalid', async () => {
                  const jugador = JugadorMother.random().toPrimitives()
                  jugador.id = 'j'
                  await expect(jugadorCreator.run(jugador)).rejects.toThrow(
                        UuidNotValid
                  )
            })

            it('should return JugadorExists Error if the player already exists', async () => {
                  await expect(
                        jugadorCreator.run(jugadores[0].toPrimitives())
                  ).rejects.toThrow(JugadorExists)
            })
      })
})
