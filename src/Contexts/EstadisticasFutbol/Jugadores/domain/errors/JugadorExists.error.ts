import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatusPartidoNotExist: number = 409
export const messagePartidoNotExist: string = 'The player already exists'

export class JugadorExists extends CustomError {
      constructor () {
            super(messagePartidoNotExist, codeStatusPartidoNotExist)
      }
}
