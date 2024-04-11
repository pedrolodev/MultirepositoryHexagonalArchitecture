import { Server } from 'http'
import request from 'supertest'
import { stringify } from 'qs'
import { AggregateRoot } from '../../../../../src/Contexts/shared/domain/AggregateRoot'
import { FilterOptions } from '@src/Contexts/shared/domain/criteria/filter/FilterFactory'

export class GetByCriteria<T extends AggregateRoot> {
      constructor(
            private httpServer: Server | undefined,
            private path: string
      ) {}

      async search(filters: FilterOptions[], toSearch: T[]): Promise<void> {
            const criteria = { filters }
            const queryString = stringify(criteria, { arrayFormat: 'indices' })

            const _request = await request(this.httpServer).get(
                  `/${this.path}/?${queryString}`
            )
            expect(_request.statusCode).toBe(200)
            const objetoEsperado = toSearch.map((value) =>
                  JSON.parse(JSON.stringify(value.toPrimitives()))
            )
            expect(objetoEsperado).toMatchObject(_request.body)
      }
}
