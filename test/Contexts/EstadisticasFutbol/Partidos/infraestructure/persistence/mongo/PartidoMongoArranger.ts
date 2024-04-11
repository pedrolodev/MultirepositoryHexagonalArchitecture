import { Partido } from '../../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/Partido'
import { Repository } from '../../../../../../../src/Contexts/shared/domain/Repository'
import { Repeater } from '../../../../../shared/domain/Repeater'
import { PartidoMother } from '../../../domain/PartidoMother'

export default class PartidoMongoArranger {
      constructor(private repository: Repository<Partido>) {}

      async initData(times: number): Promise<Partido[]> {
            const partidos: Partido[] = Repeater.random(
                  () => PartidoMother.random(),
                  times
            )
            await this.repository.saveMany(partidos)
            return partidos
      }

      async initConcretData(partidos: Partido[]): Promise<void> {
            await this.repository.saveMany(partidos)
      }
}
