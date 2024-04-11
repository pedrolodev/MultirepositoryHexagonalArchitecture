// import { ValueObject } from '../../../shared/domain/value-object/ValueObject';
import { ArrayValueObject } from '../../../shared/domain/value-object/ArrayValueObject'
import { JugadorId } from '../../shared/domain/Jugadores/JugadorId'
import { PartidoTitularesLenghtError } from './errors/PartidoTitularesLength.error'

export class PartidoTitulares extends ArrayValueObject<JugadorId> {
      constructor (value: string[]) {
            super(value, JugadorId)
            this.ensureLengthIsEleven(value)
      }

      private ensureLengthIsEleven (value: Array<string>): void {
            if (value.length !== 11) {
                  throw new PartidoTitularesLenghtError()
            }
      }
}
