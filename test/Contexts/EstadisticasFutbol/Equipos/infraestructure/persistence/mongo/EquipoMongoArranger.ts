import { Equipo } from '../../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import { Repository } from '../../../../../../../src/Contexts/shared/domain/Repository'
import { Repeater } from '../../../../../shared/domain/Repeater'
import { EquipoMother } from '../../../domain/EquipoMother'

export default class EquipoMongoArranger {
      constructor(private repository: Repository<Equipo>) {}

      async initData(times: number): Promise<Equipo[]> {
            const equipos: Equipo[] = Repeater.random(
                  () => EquipoMother.random(),
                  times
            )
            await this.repository.saveMany(equipos)
            return equipos
      }

      async initConcretData(partidos: Equipo[]): Promise<void> {
            await this.repository.saveMany(partidos)
      }
}
