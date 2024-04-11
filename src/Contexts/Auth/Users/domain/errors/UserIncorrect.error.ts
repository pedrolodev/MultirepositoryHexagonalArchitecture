import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatusUserIncorrect = 401
export const messageUserIncorrect = 'Usuario o contraseña incorrecta'

export class UserIncorrect extends CustomError {
      constructor() {
            super(messageUserIncorrect, codeStatusUserIncorrect)
      }
}
