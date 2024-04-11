import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatus: number = 404
export const message: string = 'The player does not exists'

export class JugadorNotExist extends CustomError {
      constructor () {
            super(message, codeStatus)
      }
}
