import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatusPartidoNotExist: number = 404
export const messagePartidoNotExist: string = 'No result for the search'

export class PartidoNotFound extends CustomError {
      constructor () {
            super(messagePartidoNotExist, codeStatusPartidoNotExist)
      }
}
