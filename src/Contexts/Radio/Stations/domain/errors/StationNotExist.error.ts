import { CustomError } from '../../../../shared/infraestructure/errors/CustomError'

export const codeStatus: number = 404
export const message: string = 'The station does not exists'

export class StationNotExist extends CustomError {
      constructor() {
            super(message, codeStatus)
      }
}
