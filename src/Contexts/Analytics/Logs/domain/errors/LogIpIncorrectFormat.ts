import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatusLogIpIncorrectFormat = 400
export const messageLogIpIncorrectFormat = 'Formato IP incorrecto'

export class LogIpIncorrectFormat extends CustomError {
      constructor() {
            super(messageLogIpIncorrectFormat, codeStatusLogIpIncorrectFormat)
      }
}
