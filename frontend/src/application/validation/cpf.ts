import { Validator } from './validator'
import { InvalidFieldError } from './errors'

import { validateBr } from 'js-brasil'

export class CpfValidator implements Validator {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Validator.Output | undefined {
    if (input[this.fieldName] && !validateBr.cpf(input[this.fieldName])) {
      return {
        prop: this.fieldName,
        error: new InvalidFieldError()
      }
    }
  }
}
