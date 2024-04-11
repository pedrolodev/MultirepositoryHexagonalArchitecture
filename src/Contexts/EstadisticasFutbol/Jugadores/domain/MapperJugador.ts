import { AggregateMapper } from '../../../shared/domain/AggregateMapper'
import { JugadorId } from '../../shared/domain/Jugadores/JugadorId'
import { JugadorOutput } from '../../types/Jugadores/jugador'
import { Jugador, JugadorPrimitives } from './Jugador'
import { JugadorIdAntiguo } from './JugadorIdAntiguo'
import { JugadorNombre } from './JugadorNombre'

// export type JugadorToOutput = Partial<JugadorPrimitives & {'_id':string}>

export default class MapperJugador implements AggregateMapper {
      fromPrimitives(plainData: JugadorPrimitives): Jugador {
            return new Jugador(
                  new JugadorId(plainData.id),
                  new JugadorIdAntiguo(plainData.idAntiguo),
                  new JugadorNombre(plainData.name)
            )
      }

      toOutput(data: JugadorOutput): any {
            const { _id, name } = data

            const output: Partial<JugadorOutput> = {}

            if (_id !== undefined) output.id = _id
            output.name = name

            return output
      }
}
