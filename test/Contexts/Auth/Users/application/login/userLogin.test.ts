import { UserLogin } from '@src/Contexts/Auth/Users/application/Login/UserLogin'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { RandomNumber } from '@src/Contexts/shared/infraestructure/utils/Random'
import { UserIncorrect } from '@src/Contexts/Auth/Users/domain/errors/UserIncorrect.error'
import { UserDuplicate } from '@src/Contexts/Auth/Users/domain/errors/UserDuplicate.error'

describe('Login a User', () => {
      const userRepository = new UserRepositoryMock()
      const userDuplicated = UserMother.random()
      const users = [
            UserMother.random(),
            UserMother.random(),
            UserMother.random(),
            userDuplicated,
            userDuplicated
      ]
      userRepository.returnOnSearch([...users])
      const userLogin = new UserLogin(userRepository)

      it('User Exist and return the {id,username,token}', async () => {
            const user = users[RandomNumber(0, 2)]
            const userPrimitives = user.toPrimitives()
            const { id, username, token } = await userLogin.run(
                  userPrimitives.username,
                  userPrimitives.password
            )

            userRepository.assertMatching()

            expect({ id, username, token }).toEqual(UserMother.toOutput(user))
      })

      it('should return UserIncorrect if username is not found', async () => {
            const { username, password } = UserMother.random().toPrimitives()
            await expect(userLogin.run(username, password)).rejects.toThrow(
                  UserIncorrect
            )
      })

      it('should return UserDuplicate if username is duplicated. NEVER MAY OCCUR', async () => {
            const { username, password } = userDuplicated.toPrimitives()
            await expect(userLogin.run(username, password)).rejects.toThrow(
                  UserDuplicate
            )
      })
})
