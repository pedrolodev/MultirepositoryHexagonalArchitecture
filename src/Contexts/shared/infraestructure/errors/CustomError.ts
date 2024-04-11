export class CustomError extends Error {
      readonly codeStatus: number
      constructor (message: string, codeStatus: number) {
            super(message)
            this.codeStatus = codeStatus
      }
}
