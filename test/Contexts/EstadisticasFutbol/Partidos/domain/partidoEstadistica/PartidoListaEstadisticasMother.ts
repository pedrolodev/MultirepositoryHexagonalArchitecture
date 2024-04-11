import { PartidoListaEstadisticas } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEstadistica/PartidoListaEstadisticas'
import { NumberMother } from '../../../../shared/domain/NumberMother'
import { Estadisticas } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEstadistica/TipoEstadistica'

export class PartidoListaEstadisticasMother {
      static create (value: Array<object>): PartidoListaEstadisticas {
            return new PartidoListaEstadisticas(value)
      }

      static random (): PartidoListaEstadisticas {
            const estadisticas = new Array(NumberMother.random(5, 10)).fill(undefined).map(() => {
                  return {
                        tipoEstadistica: Estadisticas.Corners,
                        local: NumberMother.random(0, 20),
                        visitante: NumberMother.random(0, 20)
                  }
            })

            return this.create(estadisticas)
      }
}
