import { FilterCategory } from './categories'
import { FilterFactory, FilterOptions } from './FilterFactory'

export class Filters {
      readonly filters: FilterCategory[]

      constructor(filters: FilterCategory[]) {
            this.filters = filters
      }

      static fromValues(filters: Array<FilterOptions>): Filters {
            return new Filters(
                  filters.map((filter) => {
                        return FilterFactory.fromValues(filter)
                  })
            )
      }

      static none(): Filters {
            return new Filters([])
      }

      toPrimitives(): object[] {
            return this.filters.map((filter) => filter.toPrimitives())
      }
}
