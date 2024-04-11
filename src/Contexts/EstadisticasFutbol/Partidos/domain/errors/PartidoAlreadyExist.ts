import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatusPartidoNotExist: number = 409
export const messagePartidoNotExist: string = 'The match already exist'

export class PartidoAlreadyExist extends CustomError {
      constructor () {
            super(messagePartidoNotExist, codeStatusPartidoNotExist)
      }
}
