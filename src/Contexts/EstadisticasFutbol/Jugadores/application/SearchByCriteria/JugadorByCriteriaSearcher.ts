import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'
import {
      Order,
      OrderType
} from '../../../../shared/domain/criteria/order/Order'
import { OrderBy } from '../../../../shared/domain/criteria/order/OrderBy'
import { OrderCategory } from '../../../../shared/domain/criteria/order/OrderCategory'
import { Repository } from '../../../../shared/domain/Repository'
import { Jugador } from '../../domain/Jugador'
import { JugadorNotExist } from '../../domain/errors/JugadorNotExist.error'
import { FilterOptions } from '../../../../../../src/Contexts/shared/domain/criteria/filter/FilterFactory'

export class JugadorByCriteriaSearcher {
      constructor(private repository: Repository<Jugador>) {}

      async run(
            filters: FilterOptions[] | [],
            order?: OrderType,
            limit?: number,
            offset?: number
      ): Promise<Jugador[]> {
            filters = filters || []
            const f = Filters.fromValues(filters)
            const o = new Order(
                  new OrderBy(order?.orderBy),
                  new OrderCategory(order?.orderCategory)
            )
            const criteria = new Criteria(f, o, limit, offset)
            const jugadores = await this.repository.matching(criteria)
            if (jugadores.length < 1) throw new JugadorNotExist()

            return jugadores
      }
}
