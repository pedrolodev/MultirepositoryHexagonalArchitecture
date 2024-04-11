import { EquipoId } from '../../../shared/domain/Equipos/EquipoId'
import { SharedEstadisticasFutbolMongoRepository } from '../../../shared/infraestructure/persistence/SharedEstadisticasFutbolMongoRepository'
import { Equipo, EquipoPrimitives } from '../../domain/Equipo'
import { mongoDocument } from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'

export type EquipoDocument = Omit<EquipoPrimitives, 'id'> & mongoDocument

export default class MongoEquipoRepository extends SharedEstadisticasFutbolMongoRepository<
      Equipo,
      EquipoId,
      EquipoDocument
> {}
