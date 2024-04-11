import {
      container,
      containerIsStarted
} from '../../../../../src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../Contexts/shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { FullBackendApp } from '@src/apps/shared/backend/FullBackendApp'
import request from 'supertest'
import { setTimeout } from 'timers/promises'
import { UserMother } from '@test/Contexts/Auth/Users/domain/UserMother'
import createToken from '../../../../../src/Contexts/Auth/shared/infraestructure/autentication/createToken'

let environmentArranger: EnvironmentArranger
const applicacion = new FullBackendApp()

describe('Route /users', () => {
      const user = UserMother.random()
      const userToSend: string = JSON.parse(JSON.stringify(user.toPrimitives()))

      beforeAll(async () => {
            await containerIsStarted
            environmentArranger = container.get(
                  'auth.shared.environmentArranger'
            )

            await environmentArranger.arrange()
            await applicacion.start()
      })

      afterAll(async () => {
            await environmentArranger.close()
            await applicacion.stop()
      })

      it('PUT/should save a user', async () => {
            const _request = await request(applicacion.httpServer)
                  .put('/users')
                  .send(userToSend)

            expect(_request.statusCode).toBe(201)
            await setTimeout(1000)
      })

      it('PUT/should save a user that exist', async () => {
            const _request = await request(applicacion.httpServer)
                  .put('/users')
                  .send(userToSend)

            expect(_request.statusCode).toBe(400)
            await setTimeout(1000)
      })

      it('POST/should find a user', async () => {
            const _request = await request(applicacion.httpServer)
                  .post('/users')
                  .send({
                        username: user.username.value,
                        password: user.password.value
                  })
            expect(_request.statusCode).toBe(200)

            expect(user.username.value).toBe(_request.body.username)
            expect(user.id.value).toBe(_request.body.id)
            expect(createToken(user.id.value, user.username.value)).toBe(
                  createToken(_request.body.id, _request.body.username)
            )
      })

      it('POST/should find a user that not exist', async () => {
            const _request = await request(applicacion.httpServer)
                  .post('/users')
                  .send({
                        username: 'JEREMIAS',
                        password: user.password.value
                  })
            expect(_request.statusCode).toBe(401)
      })
})
