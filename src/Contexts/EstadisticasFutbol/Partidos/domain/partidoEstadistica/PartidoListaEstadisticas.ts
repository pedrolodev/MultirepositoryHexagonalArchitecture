import { PartidoEstadistica, PartidoEstadisticaType } from './PartidoEstadistica'

export class PartidoListaEstadisticas {
      readonly value: Array<PartidoEstadistica>

      constructor (value: Array<object>) {
            this.ensureValueIsDefined(value)
            this.value = this.fromPrimitivesToValueObjects(value)
      }

      private ensureValueIsDefined (value: Array<object>): void {
            if (!Array.isArray(value)) {
                  throw new Error('No es un array')
            }
      }

      private fromPrimitivesToValueObjects (value: Array<object>): Array<PartidoEstadistica> {
            return value.map(evento => PartidoEstadistica.fromPrimitives(<PartidoEstadisticaType>evento))
      }

      toPrimitives (): Array<object> {
            return this.value.map(estadistica => estadistica.toPrimitives())
      }
}
