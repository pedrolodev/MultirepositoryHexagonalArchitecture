import MongoClientFactory from '../../../../../src/Contexts/shared/infraestructure/persistence/mongo/MongoClientFactory'
import { MongoClient } from 'mongodb'
import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import config from '../../../../../src/Contexts/EstadisticasFutbol/shared/infraestructure/config/'

describe('MongoClientFactory', () => {
      const factory = MongoClientFactory
      let client: MongoClient
      const url = config.get('mongo.url')

      beforeAll(async () => {
            await containerIsStarted
            client = await container.get('ef.shared.mongoClient')
      })

      afterAll(async () => {
            await client.close()
      })

      it('creates a new client with the connection already established', () => {
            expect(client).toBeInstanceOf(MongoClient)
      })

      it('creates a new client if it does not exist a client with the given name', async () => {
            const newClient = await factory.createClient('test', { url })

            expect(newClient).not.toBe(client)

            await newClient.close()
      })

      it('returns a client if it already exists', async () => {
            const newClient = await factory.createClient('ef', { url })
            expect(newClient).toBe(client)

            await newClient.close()
      })
})
