export class InvalidFieldError extends Error {
  constructor () {
    super('Campo inválido')
    this.name = 'InvalidFieldError'
  }
}

export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrigatório')
    this.name = 'RequiredFieldError'
  }
}
