import { Response, Request } from 'express'
import { CustomError } from '../CustomError'

export function handleExceptions(
      err: Error,
      req: Request,
      res: Response,
      next: Function
) {
      if (err instanceof CustomError) {
            const { codeStatus, message } = err
            return res.status(codeStatus).json(`{ error: { ${message} }`)
      }

      handleUnknownExceptions(err, req, res, next)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleUnknownExceptions = (
      err: Error,
      req: Request,
      res: Response,
      _next: Function
) => {
      console.log('ULTIMO BASTION SOMETHING WENT WRONG', err)
      res.status(500).json({ error: { message: 'Something went wrong.' } })
}
