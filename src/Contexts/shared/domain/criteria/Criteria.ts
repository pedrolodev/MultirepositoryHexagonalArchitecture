import { Filters } from './filter/Filters'
import { Order, OrderType } from './order/Order'

export type CriteriaType = {
      'filters': Filters[],
      'order'?: OrderType,
      'limit'? : number,
      'offset'? :number
    }

export class Criteria {
      readonly filters: Filters
      readonly order?: Order
      readonly limit?: number
      readonly offset?: number

      constructor (filters: Filters, order?: Order, limit?: number, offset?: number) {
            this.filters = filters
            this.order = order
            this.limit = limit
            this.offset = offset
      }

      public hasFilters (): boolean {
            return this.filters.filters.length > 0
      }

      public toPrimitives ():object {
            return {
                  filters: this.filters.toPrimitives()
            }
      }
}
