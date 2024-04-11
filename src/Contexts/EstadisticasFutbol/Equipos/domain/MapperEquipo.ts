import { AggregateMapper } from '../../../shared/domain/AggregateMapper'
import { EquipoId } from '../../shared/domain/Equipos/EquipoId'
import { EquipoOutput } from '../../types/Equipos/equipo'
import { Equipo, EquipoPrimitives } from './Equipo'
import { EquipoIdAntiguo } from './EquipoIdAntiguo'
import { EquipoNombre } from './EquipoNombre'

// export type EquipoToOutput = Partial<EquipoPrimitives & {'_id':string}>
/// //TO DO DESACOPLAR DE MONGO
export default class MapperEquipo implements AggregateMapper {
      fromPrimitives(plainData: EquipoPrimitives): Equipo {
            return new Equipo(
                  new EquipoId(plainData.id),
                  new EquipoIdAntiguo(plainData.idAntiguo),
                  new EquipoNombre(plainData.name)
            )
      }

      toOutput(data: EquipoOutput): any {
            const { _id, name } = data

            const output: Partial<EquipoOutput> = {}

            if (_id !== undefined) output.id = _id
            output.name = name

            return output
      }
}
