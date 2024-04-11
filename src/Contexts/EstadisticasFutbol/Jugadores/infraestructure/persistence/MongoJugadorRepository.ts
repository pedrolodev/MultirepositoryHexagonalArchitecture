import { mongoDocument } from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'
import { JugadorId } from '../../../shared/domain/Jugadores/JugadorId'
import { SharedEstadisticasFutbolMongoRepository } from '../../../shared/infraestructure/persistence/SharedEstadisticasFutbolMongoRepository'
import { Jugador } from '../../domain/Jugador'

interface JugadorDocument extends mongoDocument {
      name: string
}

export default class MongoJugadorRepository extends SharedEstadisticasFutbolMongoRepository<
      Jugador,
      JugadorId,
      JugadorDocument
> {}
