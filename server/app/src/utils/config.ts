import * as env from 'env-var'

export type Config = {
    clientURL: string
    magicAPIKey: string
    serverPort: number
}

export const getConfig = (): Config => {
    return {
        clientURL: env.get('CLIENT_URL').required().asString(),
        magicAPIKey: env.get('MAGIC_SECRET_KEY').required().asString(),
        serverPort: env.get('SERVER_PORT').required().asPortNumber(),
    }
}
