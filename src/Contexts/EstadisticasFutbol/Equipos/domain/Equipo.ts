import { AggregateRoot } from '../../../shared/domain/AggregateRoot'
import { EquipoId } from '../../shared/domain/Equipos/EquipoId'
import { EquipoIdAntiguo } from './EquipoIdAntiguo'
import { EquipoNombre } from './EquipoNombre'

export interface EquipoPrimitives {
    id: string;
    idAntiguo:string;
    name: string;
}

export type keysEquipo = keyof EquipoPrimitives

export class Equipo implements AggregateRoot {
      constructor (readonly id: EquipoId,
                  readonly idAntiguo: EquipoIdAntiguo,
                  readonly name: EquipoNombre) {
      }

      toPrimitives (): EquipoPrimitives {
            return {
                  id: this.id.value,
                  idAntiguo: this.idAntiguo.value,
                  name: this.name.value
            }
      }
}
