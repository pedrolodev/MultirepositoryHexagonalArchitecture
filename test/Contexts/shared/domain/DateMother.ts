import { faker } from '@faker-js/faker'

export class DateMother {
      static random (): Date {
            return faker.date.past(100)
      }
}
