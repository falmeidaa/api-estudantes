import { Validator } from './validator'
import { RequiredFieldError } from './errors'

export class RequiredValidator implements Validator {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Validator.Output | undefined {
    if (!input[this.fieldName]) {
      return {
        prop: this.fieldName,
        error: new RequiredFieldError()
      }
    }
  }
}
