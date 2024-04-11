import { AggregateRoot } from '../../../shared/domain/AggregateRoot'
import { EquipoId } from '../../shared/domain/Equipos/EquipoId'
import { PartidoListaEstadisticas } from './partidoEstadistica/PartidoListaEstadisticas'
import { PartidoListaEventos } from './partidoEvento/PartidoListaEventos'
import { PartidoFecha } from './PartidoFecha'
import { PartidoId } from './PartidoId'
import { PartidoJornada } from './PartidoJornada'
import { PartidoSuplentes } from './PartidoSuplentes'
import { PartidoTemporada } from './PartidoTemporada'
import { PartidoTitulares } from './PartidoTitulares'
import { PartidoCompeticion } from './PartidoCompeticion'

export type PartidoPrimitives = {
    id: string;
    local: string;
    visitante: string;
    competicion: string;
    temporada: number;
    jornada: number;
    fecha: string;
    equipoLocalTitulares: Array<string>;
    equipoLocalSuplentes: Array<string>;
    equipoVisitanteTitulares: Array<string>;
    equipoVisitanteSuplentes: Array<string>;
    eventos: Array<object>;
    estadisticas: Array<object>;
}

export class Partido implements AggregateRoot {
      constructor (readonly id: PartidoId,
        readonly local: EquipoId,
        readonly visitante: EquipoId,
        readonly competicion: PartidoCompeticion,
        readonly temporada: PartidoTemporada,
        readonly jornada: PartidoJornada,
        readonly fecha: PartidoFecha,
        readonly equipoLocalTitulares: PartidoTitulares,
        readonly equipoLocalSuplentes: PartidoSuplentes,
        readonly equipoVisitanteTitulares: PartidoTitulares,
        readonly equipoVisitanteSuplentes: PartidoSuplentes,
        readonly eventos: PartidoListaEventos,
        readonly estadisticas: PartidoListaEstadisticas) {

      }

      toPrimitives (): any {
            return {
                  id: this.id.value,
                  local: this.local.value,
                  visitante: this.visitante.value,
                  competicion: this.competicion.value,
                  temporada: this.temporada.value,
                  jornada: this.jornada.value,
                  fecha: this.fecha.value.toISOString(),
                  equipoLocalTitulares: this.equipoLocalTitulares.toPrimitives(),
                  equipoLocalSuplentes: this.equipoLocalSuplentes.toPrimitives(),
                  equipoVisitanteTitulares: this.equipoVisitanteTitulares.toPrimitives(),
                  equipoVisitanteSuplentes: this.equipoVisitanteSuplentes.toPrimitives(),
                  eventos: this.eventos.toPrimitives(),
                  estadisticas: this.estadisticas.toPrimitives()
            }
      }
}
