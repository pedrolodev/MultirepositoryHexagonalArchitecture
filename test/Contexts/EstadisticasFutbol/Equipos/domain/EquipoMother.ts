import { Equipo } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import { EquipoIdAntiguo } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/EquipoIdAntiguo'
import { EquipoNombre } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/EquipoNombre'
import { EquipoId } from '../../../../../src/Contexts/EstadisticasFutbol/shared/domain/Equipos/EquipoId'
import { EquipoIdMother } from '../../shared/domain/EquipoIdMother'
import { EquipoNombreMother } from './EquipoNombreMother'
import { EquipoIdAntiguoMother } from './EquipoIdAntiguoMother'

export class EquipoMother {
      static create (
            id: EquipoId,
            idAntiguo: EquipoIdAntiguo,
            name: EquipoNombre): Equipo {
            return new Equipo(id,
                  idAntiguo,
                  name)
      }

      static random (): Equipo {
            return this.create(
                  EquipoIdMother.random(),
                  EquipoIdAntiguoMother.random(),
                  EquipoNombreMother.random()
            )
      }
}
