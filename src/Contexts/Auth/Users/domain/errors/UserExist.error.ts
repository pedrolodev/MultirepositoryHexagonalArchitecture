import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatus: number = 400
export const message: string = 'The Username you are trying to create exists'

export class UserExist extends CustomError {
      constructor() {
            super(message, codeStatus)
      }
}
