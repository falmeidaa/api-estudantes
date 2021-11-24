import { MissingParamError } from '@/application/errors'
import { Validator } from './validator'

export class Required implements Validator {
  constructor (
    private readonly value: any,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.value) { return new MissingParamError(this.fieldName) }
  }
}
