import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

import { validateBr } from 'js-brasil'

export class Cpf implements Validator {
  constructor (
    private readonly value: string,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!(validateBr.cpf(this.value))) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
