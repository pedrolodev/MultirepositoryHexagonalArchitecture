import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatus: number = 422
export const message: string = 'The length of a titulares team should be 11'

export class PartidoTitularesLenghtError extends CustomError {
      constructor () {
            super(message, codeStatus)
      }
}
