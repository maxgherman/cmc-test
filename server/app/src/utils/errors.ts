export class HttpException extends Error {
    status: number
    message: string
    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.message = message

        Object.setPrototypeOf(this, HttpException.prototype)
    }
}
