import { LocalEstadistica } from './LocalEstadistica'
import { TipoEstadistica } from './TipoEstadistica'
import { VisitanteEstadistica } from './VisitanteEstadistica'

export type PartidoEstadisticaType = {
    tipoEstadistica: string;
    local: number;
    visitante: number;
}

export class PartidoEstadistica {
      constructor (
        readonly tipoEstadistica: TipoEstadistica,
        readonly local: LocalEstadistica,
        readonly visitante: VisitanteEstadistica
      ) { }

      static create (tipoEstadistica: TipoEstadistica, local: LocalEstadistica, visitante: VisitanteEstadistica): PartidoEstadistica {
            return new PartidoEstadistica(
                  tipoEstadistica,
                  local,
                  visitante
            )
      }

      static fromPrimitives (plainData: PartidoEstadisticaType): PartidoEstadistica {
            return this.create(
                  new TipoEstadistica(plainData.tipoEstadistica),
                  new LocalEstadistica(plainData.local),
                  new VisitanteEstadistica(plainData.visitante)
            )
      }

      toPrimitives (): any {
            return {
                  tipoEstadistica: this.tipoEstadistica.value,
                  local: this.local.value,
                  visitante: this.visitante.value
            }
      }
}
