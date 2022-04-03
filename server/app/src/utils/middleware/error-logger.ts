import { Request, Response, NextFunction } from 'express'
import { logger } from '../logger'

export function logErrors(err: Error, request: Request, response: Response, next: NextFunction): void {
    logger.error(err)
    next(err)
}
