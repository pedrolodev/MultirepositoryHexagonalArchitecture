import { UserRegister } from '@src/Contexts/Auth/Users/application/Register/UserRegister'
import { UuidNotValid } from '../../../../../../src/Contexts/shared/domain/value-object/UuidNotValid.error'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'

describe('Register User', () => {
      const userRepository = new UserRepositoryMock()
      const users = [UserMother.random(), UserMother.random()]
      const user = UserMother.random()
      userRepository.returnOnSearch([...users])
      const userRegister = new UserRegister(userRepository)

      describe('#Register User ', () => {
            it('should create a valid User', async () => {
                  const userPrimitives = user.toPrimitives()
                  await userRegister.run(userPrimitives)
                  userRepository.assertSaveHaveBeenCalledWith(user)
                  userRepository.assertLength(users.length + 1)
            })

            it('should return UUidNotValid Error if id is invalid', async () => {
                  const userInvalid = UserMother.random().toPrimitives()
                  userInvalid.id = 'j'
                  await expect(userRegister.run(userInvalid)).rejects.toThrow(
                        UuidNotValid
                  )
            })

            it('should return UserExist Error if the team exist', async () => {
                  await expect(
                        userRegister.run(user.toPrimitives())
                  ).rejects.toThrow(Error)
            })
      })
})
