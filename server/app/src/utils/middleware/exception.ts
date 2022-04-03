import { Request, Response, NextFunction } from 'express'
import { HttpException } from '../errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function exception(error: HttpException, request: Request, response: Response, next: NextFunction): void {
    if (response.headersSent) {
        return next(error)
    }

    const status = error.status || 500
    const message = error.message || 'Something went wrong'
    response.status(status).send({
        status,
        message,
    })
}
