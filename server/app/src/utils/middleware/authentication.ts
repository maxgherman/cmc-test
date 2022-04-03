import { Request, Response, NextFunction } from 'express'
import { Magic } from '@magic-sdk/admin'
import { getConfig } from '../config'
import { logger } from '../logger'
import { list } from '../../routes'

const config = getConfig()
const magic = new Magic(config.magicAPIKey)

const validateToken = async (token: string): Promise<boolean> => {
    try {
        await magic.token.validate(token)
        return true
    } catch (error) {
        logger.error(`Error validating toke: ${token}`, error)
        return false
    }
}

export async function authentication(request: Request, response: Response, next: NextFunction): Promise<void> {
    if (list.checkout.regex.test(request.path)) {
        const token = request?.headers.authorization?.substring(7) || ''
        const isValid = await validateToken(token)

        if (isValid) {
            next()
        } else {
            response.status(401).end(`User is not logged in.`)
        }
    } else {
        next()
    }
}
