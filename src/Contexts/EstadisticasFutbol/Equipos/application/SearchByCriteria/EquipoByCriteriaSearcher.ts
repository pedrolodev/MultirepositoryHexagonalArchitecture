import { FilterOptions } from '@src/Contexts/shared/domain/criteria/filter/FilterFactory'
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'
import {
      Order,
      OrderType
} from '../../../../shared/domain/criteria/order/Order'
import { OrderBy } from '../../../../shared/domain/criteria/order/OrderBy'
import { OrderCategory } from '../../../../shared/domain/criteria/order/OrderCategory'
import { Repository } from '../../../../shared/domain/Repository'
import { Equipo } from '../../domain/Equipo'
import { EquipoNotExist } from '../../domain/errors/EquipoNotExist.error'

export class EquipoByCriteriaSearcher {
      constructor(private repository: Repository<Equipo>) {}

      async run(
            filters: FilterOptions[] | [],
            order?: OrderType,
            limit?: number,
            offset?: number
      ): Promise<Equipo[]> {
            filters = filters || []
            const f = Filters.fromValues(filters)
            const o = new Order(
                  new OrderBy(order?.orderBy),
                  new OrderCategory(order?.orderCategory)
            )
            const criteria = new Criteria(f, o, limit, offset)
            const equipos = await this.repository.matching(criteria)

            if (equipos.length < 1) throw new EquipoNotExist()

            return equipos
      }
}
