import { EquipoCreator } from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/application/Create/EquipoCreator'
import { EquipoExist } from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/errors/EquipoExist.error'
import TeamFinder from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/services/TeamFinder'
import { UuidNotValid } from '../../../../../../src/Contexts/shared/domain/value-object/UuidNotValid.error'

import { EquipoMother } from '../../domain/EquipoMother'
import { EquipoRepositoryMock } from '../../__mocks__/EquipoRepositoryMock'

describe('Create Equipo', () => {
      const equipoRepository = new EquipoRepositoryMock()
      const equipos = [EquipoMother.random(), EquipoMother.random()]
      const equipo = EquipoMother.random()
      equipoRepository.returnOnSearch([...equipos])
      const equipoServiceSearcher = new TeamFinder(equipoRepository)
      const equipoCreator = new EquipoCreator(
            equipoRepository,
            equipoServiceSearcher
      )

      describe('#Create Equipo ', () => {
            it('should create a valid Equipo', async () => {
                  await equipoCreator.run(equipo.toPrimitives())
                  equipoRepository.assertSaveHaveBeenCalledWith(equipo)
                  equipoRepository.assertLength(equipos.length + 1)
            })

            it('should return UUidNotValid Error if id is invalid', async () => {
                  const equipoInvalid = EquipoMother.random().toPrimitives()
                  equipoInvalid.id = 'j'
                  await expect(
                        equipoCreator.run(equipoInvalid)
                  ).rejects.toThrow(UuidNotValid)
            })

            it('should return EquipoExist Error if the team exist', async () => {
                  await expect(
                        equipoCreator.run(equipo.toPrimitives())
                  ).rejects.toThrow(EquipoExist)
            })
      })
})
