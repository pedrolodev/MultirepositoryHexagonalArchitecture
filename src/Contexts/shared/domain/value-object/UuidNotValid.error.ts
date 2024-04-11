import { CustomError } from '../../infraestructure/errors/CustomError'

export class UuidNotValid extends CustomError {
      constructor () {
            super('The id is not a valid Uuid', 400)
      }
}
