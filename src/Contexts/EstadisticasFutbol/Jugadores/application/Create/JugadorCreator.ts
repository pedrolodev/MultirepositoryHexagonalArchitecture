import { JugadorId } from '../../../shared/domain/Jugadores/JugadorId'
import { Jugador, JugadorPrimitives } from '../../domain/Jugador'
import { JugadorNombre } from '../../domain/JugadorNombre'
import { Repository } from '../../../../shared/domain/Repository'
import JugadorFinder from '../../domain/services/JugadorFinder'
import { JugadorExists } from '../../domain/errors/JugadorExists.error'
import { JugadorIdAntiguo } from '../../domain/JugadorIdAntiguo'

export class JugadorCreator {
      constructor(
            private repository: Repository<Jugador>,
            private jugadorFinder: JugadorFinder
      ) {}

      async run(params: JugadorPrimitives): Promise<void> {
            const { id, idAntiguo, name } = params

            if (await this.jugadorFinder.exist({ idAntiguo }))
                  throw new JugadorExists()

            const jugadorId = new JugadorId(id)
            const jugadorIdAntiguo = new JugadorIdAntiguo(idAntiguo)
            const jugadorNombre = new JugadorNombre(name)

            const jugador = new Jugador(
                  jugadorId,
                  jugadorIdAntiguo,
                  jugadorNombre
            )
            await this.repository.save(jugador)
            await this.jugadorFinder.add(jugador)
      }
}
