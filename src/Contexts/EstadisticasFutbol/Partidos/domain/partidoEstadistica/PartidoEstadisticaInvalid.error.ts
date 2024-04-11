import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

const codeStatusPartidoNotExist: number = 404
const messagePartidoNotExist: string = 'The Stadistic you are triying to record not exists in the model definition'

export class PartidoEstadisticaInvalid extends CustomError {
      constructor () {
            super(messagePartidoNotExist, codeStatusPartidoNotExist)
      }
}
