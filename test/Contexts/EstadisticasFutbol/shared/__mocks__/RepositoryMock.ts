import { Repository } from 'src/Contexts/shared/domain/Repository'
import { AggregateRoot } from '../../../../../src/Contexts/shared/domain/AggregateRoot'
import { Criteria } from '../../../../../src/Contexts/shared/domain/criteria/Criteria'

export class RepositoryMock<T extends AggregateRoot> implements Repository<T> {
      private saveMock: jest.Mock
      private saveAllMock: jest.Mock
      private matchingMock: jest.Mock
      private values: Array<T> = []

      constructor() {
            this.saveMock = jest.fn()
            this.saveAllMock = jest.fn()
            this.matchingMock = jest.fn()
      }

      returnOnSearch(values: Array<T>) {
            this.values = values
      }

      async save(value: T): Promise<void> {
            this.saveMock(value)
            this.values.push(value)
      }

      async saveMany(values: T[]): Promise<void> {
            this.saveAllMock(values)
            this.values.push(...values)
      }

      // ONLY MATCHING EQUAL
      async matching(criteria: Criteria): Promise<any[]> {
            this.matchingMock(criteria)
            if (Object.keys(criteria).length === 0) return [...this.values]
            const filteredValues = this.values.filter((value: any) => {
                  return criteria.filters.filters.every((filter: any) => {
                        const columnSearched = filter.field.value
                        const valueSearched = filter.value.value
                        return value[columnSearched].value === valueSearched
                  })
            })

            return filteredValues.map((value) => value.toPrimitives())
      }

      assertSaveHaveBeenCalledWith(expected: T): void {
            expect(this.saveMock).toHaveBeenCalledWith(expected)
      }

      assertSaveManyHaveBeenCalledWith(expected: T[]): void {
            expect(this.saveMany).toHaveBeenCalledWith(expected)
      }

      assertMatching() {
            expect(this.matchingMock).toHaveBeenCalled()
      }

      assertLength(expectedLength: number) {
            expect(this.values.length).toBe(expectedLength)
      }
}
