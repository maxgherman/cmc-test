import { config as envConfig } from 'dotenv'
envConfig() // enables loading .env vars

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { logger } from './utils/logger'
import { getConfig } from './utils/config'
import { logErrors } from './utils/middleware/error-logger'
import { exception } from './utils/middleware/exception'
import { authentication } from './utils/middleware/authentication'
import type { Controller } from './routes/controller'

const config = getConfig()

export class App {
    readonly app: express.Application

    constructor(controllers: Controller[] = []) {
        this.app = express()

        this.#initializeMiddleware()
        this.#initializeControllers(controllers)
    }

    #initializeMiddleware() {
        this.app.use(express.json())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(
            cors({
                origin: config.clientURL,
            }),
        )
        this.app.use(authentication)
        this.app.use(logErrors)
        this.app.use(exception)
    }

    #initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router)
        })
    }

    listen(): void {
        this.app.listen(config.serverPort, () => {
            logger.info(`App listening on the port ${config.serverPort}`)
        })
    }
}
