import { faker } from '@faker-js/faker'

export class NumberMother {
      static random (min?: number, max?: number): number {
            return faker.datatype.number({ min, max })
      }
}
