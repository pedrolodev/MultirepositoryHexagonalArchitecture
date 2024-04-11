import { AggregateRoot } from '../../../shared/domain/AggregateRoot'
import { JugadorId } from '../../shared/domain/Jugadores/JugadorId'
import { JugadorIdAntiguo } from './JugadorIdAntiguo'
import { JugadorNombre } from './JugadorNombre'

export interface JugadorPrimitives {
    id: string;
    idAntiguo: string;
    name: string;
}

export class Jugador implements AggregateRoot {
      constructor (readonly id: JugadorId,
        readonly idAntiguo: JugadorIdAntiguo,
        readonly name: JugadorNombre) {
      }

      toPrimitives (): JugadorPrimitives {
            return {
                  id: this.id.value,
                  idAntiguo: this.idAntiguo.value,
                  name: this.name.value
            }
      }
}
