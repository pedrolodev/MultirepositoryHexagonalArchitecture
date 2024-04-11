import { FilterOptions } from '../../../../../../src/Contexts/shared/domain/criteria/filter/FilterFactory'
import { Repository } from '../../../../shared/domain/Repository'
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'
import {
      Order,
      OrderType
} from '../../../../shared/domain/criteria/order/Order'

import { Station } from '../../domain/Station'
import { StationNotExist } from '../../domain/errors/StationNotExist.error'

export class StatonByCriteriaSearcher {
      constructor(private repository: Repository<Station>) {}

      async run(
            filters: FilterOptions[] | [],
            order: OrderType,
            limit?: number,
            offset?: number
      ): Promise<Station[]> {
            filters = filters || []
            const f = Filters.fromValues(filters)

            const { orderBy, orderCategory } = order
            const o = Order.fromValues(orderBy, orderCategory)

            const criteria = new Criteria(f, o, limit, offset)
            const stations = await this.repository.matching(criteria)

            if (stations.length < 1) throw new StationNotExist()

            return stations
      }
}
