import { OrderBy, OrderByType } from './OrderBy'
import {
      OrderCategory,
      OrderCategories,
      OrderCategoryType
} from './OrderCategory'

export type OrderType = {
      orderBy: OrderByType
      orderCategory: OrderCategoryType
}

export class Order {
      readonly orderBy: OrderBy
      readonly orderCategory: OrderCategory

      constructor(orderBy: OrderBy, orderCategory: OrderCategory) {
            this.orderBy = orderBy
            this.orderCategory = orderCategory
      }

      static fromValues(orderBy?: string, orderCategory?: string): Order {
            if (!orderBy) {
                  return Order.none()
            }

            return new Order(
                  new OrderBy(orderBy),
                  OrderCategory.fromValue(orderCategory || OrderCategories.ASC)
            )
      }

      static none(): Order {
            return new Order(
                  new OrderBy(''),
                  new OrderCategory(OrderCategories.NONE)
            )
      }

      static desc(orderBy: string): Order {
            return new Order(
                  new OrderBy(orderBy),
                  new OrderCategory(OrderCategories.DESC)
            )
      }

      static asc(orderBy: string): Order {
            return new Order(
                  new OrderBy(orderBy),
                  new OrderCategory(OrderCategories.ASC)
            )
      }

      public hasOrder() {
            return !this.orderCategory.isNone()
      }
}
