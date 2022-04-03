export type Config = {
    magicKey: string
    serverUrl: string
}
let config: Config;

export const getConfig = (): Config =>{
    if(config) {
        return config
    }

    config = {
        magicKey: import.meta.env.VITE_APP_MAGIC_PUBLISHABLE_KEY as string,
        serverUrl: import.meta.env.VITE_APP_SERVER_URL as string
    }

    return config
} 