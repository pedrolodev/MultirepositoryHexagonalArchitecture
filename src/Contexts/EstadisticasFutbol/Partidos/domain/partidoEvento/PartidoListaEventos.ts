import { PartidoEvento, PartidoEventoType } from './PartidoEvento'

export class PartidoListaEventos {
      readonly value: Array<PartidoEvento>

      constructor (value: Array<object>) {
            this.ensureValueIsDefined(value)
            this.value = this.fromPrimitivesToValueObjects(value)
      }

      private ensureValueIsDefined (value: Array<object>): void {
            if (!Array.isArray(value)) {
                  throw new Error('No es un array')
            }
      }

      private fromPrimitivesToValueObjects (value: Array<object>): Array<PartidoEvento> {
            return value.map(evento => PartidoEvento.fromPrimitives(<PartidoEventoType>evento))
      }

      toPrimitives (): Array<object> {
            return this.value.map(evento => evento.toPrimitives())
      }
}
