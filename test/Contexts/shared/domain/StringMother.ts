import { faker } from '@faker-js/faker'
import { RandomNumber } from '../../../../src/Contexts/shared/infraestructure/utils/Random'

export class StringMother {
      static fullName(): string {
            return faker.name.fullName()
      }

      static teamName(): string {
            return faker.address.cityName()
      }

      static userName(): string {
            return faker.internet.userName()
      }

      static password(): string {
            return faker.internet.password()
      }

      static ipv4(): string {
            return faker.internet.ipv4()
      }

      static ipv6(): string {
            return faker.internet.ipv6()
      }

      static userAgent(): string {
            return faker.internet.userAgent()
      }

      static date(): Date {
            return faker.date.past(1)
      }

      static competitionName(): string {
            const nombres = [
                  'Primera',
                  'segunda',
                  '1REF',
                  '2REF',
                  'Premier',
                  'Bundesliga',
                  'Serie A'
            ]
            const indiceNombresAleatorio = RandomNumber(0, nombres.length - 1)

            return nombres[indiceNombresAleatorio]
      }
}
