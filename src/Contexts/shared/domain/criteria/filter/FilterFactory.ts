import { FilterCategory } from './categories'
import { GroupFilter, GroupFilterPrimitives } from './categories/GroupFilter'
import { LookupFilter, LookupFilterPrimitives } from './categories/LookupFilter'
import {
      LookupArrayFilterPrimitives,
      LookuparrayFilter
} from './categories/LookuparrayFilter'
import { MatchFilter, MatchFilterPrimitives } from './categories/MatchFilter'

export type FilterOptions =
      | MatchFilterPrimitives
      | LookupFilterPrimitives
      | LookupArrayFilterPrimitives
      | GroupFilterPrimitives

export class FilterFactory {
      static fromValues(params: FilterOptions): FilterCategory {
            if (params.type === 'match') return MatchFilter.fromValues(params)
            if (params.type === 'lookup') return LookupFilter.fromValues(params)
            if (params.type === 'lookuparray')
                  return LookuparrayFilter.fromValues(params)
            if (params.type === 'group') return GroupFilter.fromValues(params)

            throw new Error('Tipo de filtro no definido o incorrecto')
      }
}
