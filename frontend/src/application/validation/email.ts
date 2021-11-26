import { Validator } from './validator'
import { InvalidFieldError } from './errors'

import validator from 'validator'

export class EmailValidator implements Validator {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Validator.Output | undefined {
    if (input[this.fieldName] && !validator.isEmail(input[this.fieldName])) {
      return {
        prop: this.fieldName,
        error: new InvalidFieldError()

      }
    }
  }
}
