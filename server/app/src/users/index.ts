import express, { Request } from 'express'
import { Magic } from '@magic-sdk/admin'
import type { Controller } from '../routes/controller'
import { list } from '../routes'
import { getConfig } from '../utils/config'
import { HttpException } from '../utils/errors'
import { logger } from '../utils/logger'

const validateToken = async (token: string, magic: Magic): Promise<void> => {
    try {
        await magic.token.validate(token)
    } catch {
        throw new HttpException(401, 'Unauthorized access')
    }
}

const getToken = (request: Request): string => request?.headers.authorization?.substring(7) || ''

export const userController = (): Controller => {
    const config = getConfig()
    const router = express.Router()
    const magic = new Magic(config.magicAPIKey)

    // login
    // /api/login
    router.post(list.login, async (request, response) => {
        try {
            const token = getToken(request)
            await validateToken(token, magic)
            response.status(200).end('User is logged in.')
        } catch (error) {
            logger.error((error as Error).message)
            response.status(401).end()
        }
    })

    // logout
    // /api/logout
    router.post(list.logout, async (request, response) => {
        try {
            const token = getToken(request)
            await magic.users.logoutByToken(token)
            response.status(200).end('User is logged out.')
        } catch (error) {
            logger.error((error as Error).message)
            response.status(422).end()
        }
    })

    return {
        path: '/',
        router,
    }
}
