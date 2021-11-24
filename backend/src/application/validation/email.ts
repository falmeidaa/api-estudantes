import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

import validator from 'validator'

export class Email implements Validator {
  constructor (
    private readonly value: string,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!validator.isEmail(this.value)) { return new InvalidFieldError(this.fieldName) }
  }
}
