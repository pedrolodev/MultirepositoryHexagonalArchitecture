import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject'
import { PartidoEventoInvalid } from './PartidoEventoInvalid.error'

export enum Eventos {
      'Gol' = 'Gol de ',
      'Gol de penalti' = 'Gol de penalti',
      'Gol de falta' = 'Gol de falta',
      'Gol en propia meta' = 'Gol de (p.p)',
      'Gol anulado' = 'Gol anulado',
      'Gol anulado por VAR' = 'Anulado por var',
      'Asistencia' = 'Asistencia',
      'Amarilla' = 'T. Amarilla',
      'Roja' = 'Tarjeta Roja a ',
      'Roja por segunda amarilla' = '2a Amarilla y Roja',
      'Tiro palo' = 'Tiro al palo',
      'Sustitución-Entrada' = 'Entra en el partido',
      'Sustitución-Salida' = 'Sale del partido',
      'Penalti cometido' = 'Penalti cometido',
      'Penalti fallado' = 'Penalti fallado',
      'Penalti parado' = 'Penalti parado',
      'Lesionado' = 'Lesionado'
}

export type EventoValues = keyof typeof Eventos
export type EventoLabels = `${Eventos}`

export class TipoEvento extends StringValueObject {
      constructor(value: string) {
            super(value)
            this.checkEventoExists(value)
      }

      private checkEventoExists(value: string): void {
            if (!(<any>Object).values(Eventos).includes(value)) {
                  throw new PartidoEventoInvalid()
            }
      }
}
