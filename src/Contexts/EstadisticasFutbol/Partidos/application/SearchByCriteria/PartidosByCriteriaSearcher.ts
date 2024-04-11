import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'
import {
      Order,
      OrderType
} from '../../../../shared/domain/criteria/order/Order'
import { OrderBy } from '../../../../shared/domain/criteria/order/OrderBy'
import { OrderCategory } from '../../../../shared/domain/criteria/order/OrderCategory'
import { Repository } from '../../../../shared/domain/Repository'
import { Partido } from '../../domain/Partido'
import { PartidoNotFound } from '../../domain/errors/PartidoNotFound.error'
import { FilterOptions } from '../../../../../../src/Contexts/shared/domain/criteria/filter/FilterFactory'

export class PartidosByCriteriaSearcher {
      constructor(private repository: Repository<Partido>) {}

      async run(
            filters: FilterOptions[] | [],
            order?: OrderType,
            limit?: number,
            offset?: number
      ): Promise<any[]> {
            filters = filters || []
            const f = Filters.fromValues(filters)
            const o = new Order(
                  new OrderBy(order?.orderBy),
                  new OrderCategory(order?.orderCategory)
            )
            const criteria = new Criteria(f, o, limit, offset)
            const partidos = await this.repository.matching(criteria)
            if (partidos.length < 1) throw new PartidoNotFound()

            return partidos
      }
}
