export class ServerError extends Error {
  constructor (error?: Error) {
    super(error?.stack)
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
export class UnexpectedError extends Error {
  constructor () {
    super('Unexpected error. Try again soon')
    this.name = 'UnexpectedError'
  }
}
