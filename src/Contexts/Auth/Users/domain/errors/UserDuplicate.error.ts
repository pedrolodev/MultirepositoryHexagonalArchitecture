import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatusUserIncorrect = 500
export const messageUserIncorrect = 'Error interno. Code: xdsx2'

export class UserDuplicate extends CustomError {
      constructor() {
            super(messageUserIncorrect, codeStatusUserIncorrect)
      }
}
