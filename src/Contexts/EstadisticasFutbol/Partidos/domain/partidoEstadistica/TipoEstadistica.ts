import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject'
import { PartidoEstadisticaInvalid } from './PartidoEstadisticaInvalid.error'

export enum Estadisticas {
      'Posesion' = 'Posesión del balón',
      'Goles' = 'Goles',
      'Tiros-a-puerta' = 'Tiros a puerta',
      'Tiro-fuera' = 'Tiros fuera',
      'Tiros-totales' = 'Total tiros',
      'Paradas' = 'Paradas del portero',
      'Corners' = 'Saques de esquina',
      'Amarillas' = 'Tarjetas Amarillas',
      'Rojas' = 'Tarjetas Rojas',
      'Offsides' = 'Fueras de juego',
      'Sustituciones' = 'Sustituciones',
      'Faltas' = 'Faltas',
      'Asistencias' = 'Asistencias',
      'Tiros-al-palo' = 'Tiros al palo',
      'Lesiones' = 'Lesiones',
      'Penaltis-cometidos' = 'Penalti cometido'
}

export type EstadisticaValues = keyof typeof Estadisticas
export type EstadisticaLabels = `${Estadisticas}`

export class TipoEstadistica extends StringValueObject {
      constructor(value: string) {
            super(value)
            this.checkEventoExists(value)
      }

      private checkEventoExists(value: string): void {
            if (!(<any>Object).values(Estadisticas).includes(value)) {
                  throw new PartidoEstadisticaInvalid()
            }
      }
}
