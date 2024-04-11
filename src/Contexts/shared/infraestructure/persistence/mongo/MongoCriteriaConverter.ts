import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Operator } from '../../../../shared/domain/criteria/filter/FilterOperator'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'
import { Order } from '../../../../shared/domain/criteria/order/Order'
import { GroupFilter } from '../../../domain/criteria/filter/categories/GroupFilter'
import { LookupFilter } from '../../../domain/criteria/filter/categories/LookupFilter'
import { MatchFilter } from '../../../domain/criteria/filter/categories/MatchFilter'

type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex'
type MongoFilterValue = boolean | string | number | Date
type MongoFilterOperation = {
      [operator in MongoFilterOperator]?: MongoFilterValue
}
type MongoFilter =
      | { [field: string]: MongoFilterOperation }
      | { [field: string]: { $not: MongoFilterOperation } }
type MongoMatch = { $match: MongoFilter }
type MongoLookupOperator = 'from' | 'localField' | 'foreignField' | 'as'
type MongoLookup = { $lookup: { [operator in MongoLookupOperator]: string } }
type MongoLookuparrayOperator = 'from' | 'let' | 'pipeline' | 'as'
type MongoLookuparray = {
      $lookup: {
            [operator in MongoLookuparrayOperator]:
                  | string
                  | object
                  | Array<object>
      }
}
type MongoUnwind = { $unwind: string }

type MongoGroupOperator = '_id'
type MongoGroup = {
      $group: { [operator in MongoGroupOperator]: Record<string, any> }
}

type MongoPipelineStage =
      | MongoMatch
      | MongoLookup
      | MongoLookuparray
      | MongoUnwind
      | MongoGroup
type MongoDirection = 1 | -1
type MongoSort = { [field: string]: MongoDirection }

interface MongoQuery {
      filter: MongoPipelineStage[]
      sort: MongoSort
      skip: number
      limit: number
}

interface TransformerFunction<T, K> {
      (value: T): K
}

export class MongoCriteriaConverter {
      private matchFilterTransformers: Map<
            Operator,
            TransformerFunction<MatchFilter, MongoMatch>
      >

      constructor() {
            this.matchFilterTransformers = new Map<
                  Operator,
                  TransformerFunction<MatchFilter, MongoMatch>
            >([
                  [Operator.EQUAL, this.equalFilter],
                  [Operator.NOT_EQUAL, this.notEqualFilter],
                  [Operator.GT, this.greaterThanFilter],
                  [Operator.LT, this.lowerThanFilter],
                  [Operator.CONTAINS, this.containsFilter],
                  [Operator.NOT_CONTAINS, this.notContainsFilter]
            ])
      }

      public convert(criteria: Criteria): MongoQuery {
            if (
                  !criteria ||
                  (typeof criteria === 'object' &&
                        Object.keys(criteria).length === 0)
            ) {
                  return {
                        filter: [],
                        sort: { _id: -1 },
                        skip: 0,
                        limit: 0
                  }
            }

            return {
                  filter: criteria.hasFilters()
                        ? this.generateFilter(criteria.filters)
                        : [],
                  sort:
                        criteria.order !== undefined
                              ? this.generateSort(criteria.order)
                              : { _id: -1 },
                  skip: criteria.offset || 0,
                  limit: criteria.limit || 0
            }
      }

      protected generateFilter(filters: Filters): MongoPipelineStage[] | [] {
            const unwind: MongoPipelineStage[] = []
            const group: GroupFilter[] = []
            const filter: MongoPipelineStage[] = filters.filters
                  .filter((filter) => {
                        if (filter.type === 'group') {
                              group.push(filter as GroupFilter)
                              return false
                        }
                        return true
                  })
                  .map((filter) => {
                        if (filter.type === 'match') {
                              return this.generateFilterMatch(
                                    filter as MatchFilter
                              )
                        }
                        if (filter.type === 'lookup') {
                              unwind.push(
                                    this.generateUnwind(filter as LookupFilter)
                              )
                              return this.generateLookup(filter as LookupFilter)
                        }
                        if (filter.type === 'lookuparray') {
                              return this.generateLookuparray(
                                    filter as LookupFilter
                              )
                        }

                        throw new Error('No existe el filtro')
                  })
            if (group.length) {
                  return [this.generateGroup(group), ...filter, ...unwind]
            }
            return [...filter, ...unwind]
      }

      protected generateFilterMatch(filter: MatchFilter): MongoMatch {
            const transformer = this.matchFilterTransformers.get(
                  filter.operator.value
            )
            if (!transformer) {
                  throw Error(
                        `Unexpected operator value ${filter.operator.value}`
                  )
            }
            return transformer(filter)
      }

      protected generateLookup(filter: LookupFilter): MongoLookup {
            const from = filter.from
            const field = filter.field.value
            return {
                  $lookup: {
                        from,
                        localField: field,
                        foreignField: '_id',
                        as: field
                  }
            }
      }

      protected generateLookuparray(filter: LookupFilter): MongoLookuparray {
            const from = filter.from
            const field = filter.field.value

            return {
                  $lookup: {
                        from,
                        let: { campo: '$' + field },
                        pipeline: [
                              {
                                    $match: {
                                          $expr: { $in: ['$_id', '$$campo'] }
                                    }
                              }
                        ],
                        as: field
                  }
            }
      }

      protected generateGroup(filters: GroupFilter[]): MongoGroup {
            const value: Record<string, any> = {}
            filters.forEach((filter) => {
                  const field = filter.field.value
                  value[field] = '$' + field
            })

            return {
                  $group: {
                        _id: value
                  }
            }
      }

      protected generateUnwind(filter: LookupFilter): MongoUnwind {
            const field = filter.field.value
            return { $unwind: '$' + field }
      }

      protected generateSort(order: Order): MongoSort {
            if (!order.hasOrder()) return { _id: -1 }
            return {
                  [order.orderBy.value === 'id' ? '_id' : order.orderBy.value]:
                        order.orderCategory.isAsc() ? 1 : -1
            }
      }

      private equalFilter(filter: MatchFilter): MongoMatch {
            return {
                  $match: {
                        [filter.field.value]: {
                              $eq: filter.value.value.valueOf()
                        }
                  }
            }
      }

      private notEqualFilter(filter: MatchFilter): MongoMatch {
            return {
                  $match: {
                        [filter.field.value]: {
                              $ne: filter.value.value.valueOf()
                        }
                  }
            }
      }

      private greaterThanFilter(filter: MatchFilter): MongoMatch {
            return {
                  $match: {
                        [filter.field.value]: {
                              $gt: filter.value.value.valueOf()
                        }
                  }
            }
      }

      private lowerThanFilter(filter: MatchFilter): MongoMatch {
            return {
                  $match: {
                        [filter.field.value]: {
                              $lt: filter.value.value.valueOf()
                        }
                  }
            }
      }

      private containsFilter(filter: MatchFilter): MongoMatch {
            return {
                  $match: {
                        [filter.field.value]: {
                              $regex: filter.value.value.valueOf()
                        }
                  }
            }
      }

      private notContainsFilter(filter: MatchFilter): MongoMatch {
            return {
                  $match: {
                        [filter.field.value]: {
                              $not: { $regex: filter.value.value.valueOf() }
                        }
                  }
            }
      }
}
