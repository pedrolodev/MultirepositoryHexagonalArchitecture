import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatus: number = 404
export const message: string = 'The team does not exists'

export class EquipoNotExist extends CustomError {
      constructor () {
            super(message, codeStatus)
      }
}
