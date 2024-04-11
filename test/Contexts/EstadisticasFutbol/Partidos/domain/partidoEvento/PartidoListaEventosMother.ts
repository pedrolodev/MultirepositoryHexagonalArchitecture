import { PartidoListaEventos } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/PartidoListaEventos'
import { JugadorIdMother } from '../../../shared/domain/JugadorIdMother'
import { NumberMother } from '../../../../shared/domain/NumberMother'
import { Eventos } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/TipoEvento'
import { MinutoEventoMother } from './MinutoEventoMother'
import { EquipoIdMother } from '../../../shared/domain/EquipoIdMother'

export class PartidoListaEventosMother {
      static create (value: Array<object>): PartidoListaEventos {
            return new PartidoListaEventos(value)
      }

      static random (): PartidoListaEventos {
            const eventos = new Array(NumberMother.random(5, 10)).fill(undefined).map(() => {
                  return {
                        equipo: EquipoIdMother.random().value,
                        jugador: JugadorIdMother.random().value,
                        minuto: MinutoEventoMother.random().value,
                        tipoEvento: Eventos.Amarilla
                  }
            })
            return this.create(eventos)
      }
}
