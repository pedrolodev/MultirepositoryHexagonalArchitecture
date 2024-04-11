import { FilterType } from '.'
import { Filter } from '../Filter'
import { FilterField } from '../FilterField'

export type GroupFilterPrimitives = {
      type: 'group'
      field: string
}

export class GroupFilter implements Filter {
      readonly type: FilterType = 'group'

      constructor(readonly field: FilterField) {}

      static fromValues(values: { field: string }): GroupFilter {
            const { field } = values

            if (!field) {
                  throw new Error(
                        'El filtro Group no está correctamente configurado'
                  )
            }
            return new GroupFilter(new FilterField(field))
      }

      toPrimitives(): object {
            return { type: this.type, field: this.field.value }
      }
}
