import { EquipoId } from '../../../shared/domain/Equipos/EquipoId'
import { JugadorId } from '../../../shared/domain/Jugadores/JugadorId'
import { MinutoEvento } from './MinutoEvento'
import { TipoEvento } from './TipoEvento'

export type PartidoEventoType = {
    tipoEvento: string;
    minuto: number;
    jugador: string;
    equipo: string;
}

export class PartidoEvento {
      constructor (
        readonly tipoEvento: TipoEvento,
        readonly minuto: MinutoEvento,
        readonly jugador: JugadorId,
        readonly equipo: EquipoId
      ) { }

      static create (tipoEvento: TipoEvento, minuto: MinutoEvento, jugador: JugadorId, equipo:EquipoId): PartidoEvento {
            return new PartidoEvento(
                  tipoEvento,
                  minuto,
                  jugador,
                  equipo
            )
      }

      static fromPrimitives (plainData: PartidoEventoType): PartidoEvento {
            return this.create(
                  new TipoEvento(plainData.tipoEvento),
                  new MinutoEvento(plainData.minuto),
                  new JugadorId(plainData.jugador),
                  new EquipoId(plainData.equipo)
            )
      }

      toPrimitives (): any {
            return {
                  tipoEvento: this.tipoEvento.value,
                  minuto: this.minuto.value,
                  jugador: this.jugador.value,
                  equipo: this.equipo.value
            }
      }
}
