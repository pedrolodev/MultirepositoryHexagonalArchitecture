import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatus: number = 404
export const message: string = 'The team you are trying to create exists'

export class EquipoExist extends CustomError {
      constructor () {
            super(message, codeStatus)
      }
}
