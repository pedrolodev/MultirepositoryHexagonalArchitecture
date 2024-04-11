import { FilterField } from './FilterField'
import { FilterType } from './categories'

export type Filter = {
      type: FilterType
      field: FilterField
      toPrimitives(): object
}
