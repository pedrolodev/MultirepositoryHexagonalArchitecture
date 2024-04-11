// import { ValueObject } from '../../../shared/domain/value-object/ValueObject';
import { ArrayValueObject } from '../../../shared/domain/value-object/ArrayValueObject'
import { JugadorId } from '../../shared/domain/Jugadores/JugadorId'

export class PartidoSuplentes extends ArrayValueObject<JugadorId> {
      constructor (value: Array<string>) {
            super(value, JugadorId)
            this.ensureLengthIsLessThanFifteen(value)
      }

      private ensureLengthIsLessThanFifteen (value: Array<string>): void {
            if (value.length > 20) {
                  throw new Error('Suplentes must be less than 20 players')
            }
      }
}
