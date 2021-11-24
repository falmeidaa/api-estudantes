export class InvalidFieldError extends Error {
  constructor (paramName?: string) {
    const message = paramName === undefined
      ? 'Invalid field'
      : `The field ${paramName} is invalid`
    super(message)
    this.name = 'InvalidFieldError'
  }
}

export class MissingParamError extends Error {
  constructor (paramName?: string) {
    const message = paramName === undefined
      ? 'Field required'
      : `The field ${paramName} is required`
    super(message)
    this.name = 'MissingParamError'
  }
}
