import { EquipoId } from '../../../shared/domain/Equipos/EquipoId'
import { Equipo, EquipoPrimitives } from '../../domain/Equipo'
import { EquipoNombre } from '../../domain/EquipoNombre'
import { Repository } from '../../../../shared/domain/Repository'
import TeamFinder from '../../domain/services/TeamFinder'
import { EquipoExist } from '../../domain/errors/EquipoExist.error'
import { EquipoIdAntiguo } from '../../domain/EquipoIdAntiguo'

export class EquipoCreator {
      constructor(
            private repository: Repository<Equipo>,
            private finder: TeamFinder
      ) {}

      async run(params: EquipoPrimitives): Promise<void> {
            const { id, idAntiguo, name } = params

            if (await this.finder.exist({ name })) throw new EquipoExist()

            const equipoId = new EquipoId(id)
            const equipoIdAntiguo = new EquipoIdAntiguo(idAntiguo)
            const equipoNombre = new EquipoNombre(name)

            const equipo = new Equipo(equipoId, equipoIdAntiguo, equipoNombre)
            await this.repository.save(equipo)
            await this.finder.add(equipo)
      }
}
