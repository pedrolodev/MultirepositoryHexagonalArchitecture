import { Jugador } from '../../../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/Jugador'
import { Repository } from '../../../../../../../src/Contexts/shared/domain/Repository'
import { Repeater } from '../../../../../shared/domain/Repeater'
import { JugadorMother } from '../../../domain/JugadorMother'

export default class JugadorMongoArranger {
      constructor(private repository: Repository<Jugador>) {}

      async initData(times: number): Promise<Jugador[]> {
            const jugadores: Jugador[] = Repeater.random(
                  () => JugadorMother.random(),
                  times
            )
            await this.repository.saveMany(jugadores)
            return jugadores
      }

      async initConcretData(partidos: Jugador[]): Promise<void> {
            await this.repository.saveMany(partidos)
      }
}
