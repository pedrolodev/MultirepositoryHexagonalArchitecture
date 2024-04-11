import { PartidoCreator } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/application/Create/PartidoCreator'
import { PartidoEstadisticaInvalid } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEstadistica/PartidoEstadisticaInvalid.error'
import { PartidoEventoInvalid } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/PartidoEventoInvalid.error'
import { PartidoTitularesLenghtError } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/errors/PartidoTitularesLength.error'
import { UuidNotValid } from '../../../../../../src/Contexts/shared/domain/value-object/UuidNotValid.error'
import { PartidoRepositoryMock } from '../../__mocks__/PartidoRepositoryMock'
import { JugadorRepositoryMock } from '../../../Jugadores/__mocks__/JugadorRepositoryMock'
import { EquipoRepositoryMock } from '../../../Equipos/__mocks__/EquipoRepositoryMock'
import JugadorFinder from '../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/services/JugadorFinder'
import {
      jugadores,
      equipos,
      partidos,
      partidosFromCliente
} from '../../../shared/domain/setupTest'
import TeamFinder from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/services/TeamFinder'
import { RandomNumber } from '../../../../../../src/Contexts/shared/infraestructure/utils/Random'
import { PartidoAlreadyExist } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/errors/PartidoAlreadyExist'

describe('Create Partido', () => {
      // const factoryPartido = new FactoryPartido()
      const partidoRepository = new PartidoRepositoryMock()
      const jugadorRepository = new JugadorRepositoryMock()
      const equipoRepository = new EquipoRepositoryMock()

      const indicePartido = 0
      const partidoSave = partidos[indicePartido]
      const partidoFromClienteSave = partidosFromCliente[indicePartido]
      partidos.splice(indicePartido, 1)
      partidosFromCliente.splice(indicePartido, 1)

      partidoRepository.returnOnSearch(partidos)
      jugadorRepository.returnOnSearch(jugadores)
      equipoRepository.returnOnSearch(equipos)
      const jugadorFinder = new JugadorFinder(jugadorRepository)
      const equipoFinder = new TeamFinder(equipoRepository)

      const partidoCreator = new PartidoCreator(
            partidoRepository,
            jugadorFinder,
            equipoFinder
      )

      describe('#Create Partido ', () => {
            it('should return UUidNotValid Error if id is invalid', async () => {
                  const indicePartido = RandomNumber(0, partidos.length - 1)
                  const partidoFromCliente = partidosFromCliente[indicePartido]
                  partidos.splice(indicePartido, 1)
                  partidosFromCliente.splice(indicePartido, 1)
                  partidoFromCliente.id = 'j'
                  await expect(
                        partidoCreator.run(partidoFromCliente)
                  ).rejects.toThrow(UuidNotValid)
            })

            it('should return PartidoEventoInvalid Error if evento does not exist in the model', async () => {
                  const indicePartido = RandomNumber(0, partidos.length - 1)
                  const partidoFromCliente: any =
                        partidosFromCliente[indicePartido]
                  partidos.splice(indicePartido, 1)
                  partidosFromCliente.splice(indicePartido, 1)
                  partidoFromCliente.eventos[0].tipoEvento = 'invalid'
                  await expect(
                        partidoCreator.run(partidoFromCliente)
                  ).rejects.toThrow(PartidoEventoInvalid)
            })

            it('should return PartidoEstadisticaInvalid Error if estadistica does not exist in the model', async () => {
                  const indicePartido = RandomNumber(0, partidos.length - 1)
                  const partidoFromCliente: any =
                        partidosFromCliente[indicePartido]
                  partidos.splice(indicePartido, 1)
                  partidosFromCliente.splice(indicePartido, 1)
                  partidoFromCliente.estadisticas[0].tipoEstadistica = 'invalid'
                  await expect(
                        partidoCreator.run(partidoFromCliente)
                  ).rejects.toThrow(PartidoEstadisticaInvalid)
            })

            it('should return PartidoTitularesLenght Error if titulares does not have 11 players', async () => {
                  const indicePartido = RandomNumber(0, partidos.length - 1)
                  const partidoFromCliente: any =
                        partidosFromCliente[indicePartido]
                  partidos.splice(indicePartido, 1)
                  partidosFromCliente.splice(indicePartido, 1)
                  partidoFromCliente.equipoLocalTitulares.push(
                        jugadores[0].name.value
                  )
                  await expect(
                        partidoCreator.run(partidoFromCliente)
                  ).rejects.toThrow(PartidoTitularesLenghtError)
            })

            it('should create a valid Partido', async () => {
                  const newValue = Object.assign(
                        {},
                        JSON.parse(JSON.stringify(partidoFromClienteSave))
                  )
                  await partidoCreator.run(newValue)
                  partidoRepository.assertSaveHaveBeenCalledWith(partidoSave)
            })

            it('should return PartidoAlreadyExist Error if local/visitante/temporada already exist', async () => {
                  await expect(
                        partidoCreator.run(partidoFromClienteSave)
                  ).rejects.toThrow(PartidoAlreadyExist)
            })
      })
})
