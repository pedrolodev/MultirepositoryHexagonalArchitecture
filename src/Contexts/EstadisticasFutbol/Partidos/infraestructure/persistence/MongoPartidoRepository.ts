import { Partido } from '../../domain/Partido'
import { PartidoId } from '../../domain/PartidoId'
import { SharedEstadisticasFutbolMongoRepository } from '../../../shared/infraestructure/persistence/SharedEstadisticasFutbolMongoRepository'
import { mongoDocument } from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'

interface PartidoDocument extends mongoDocument {
      local: string
      visitante: string
      temporada: number
      competicion: string
      jornada: number
      fecha: Date
      equipoLocalTitulares: Array<string>
      equipoLocalSuplentes: Array<string>
      equipoVisitanteTitulares: Array<string>
      equipoVisitanteSuplentes: Array<string>
      eventos: Array<object>
      estadisticas: Array<object>
}

export default class MongoPartidoRepository extends SharedEstadisticasFutbolMongoRepository<
      Partido,
      PartidoId,
      PartidoDocument
> {}
