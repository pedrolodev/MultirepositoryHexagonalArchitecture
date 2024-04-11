import { User } from '@src/Contexts/Auth/Users/domain/User'
import { RepositoryMock } from '@test/Contexts/EstadisticasFutbol/shared/__mocks__/RepositoryMock'

export class UserRepositoryMock extends RepositoryMock<User> {}
