import { Validator } from './validator'

export class ValidatorComposite {
  constructor (private readonly validators: Validator[]) {}

  validate (input: any): Validator.Output[] {
    const errors = []
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) errors.push(error)
    }
    return errors.length ? errors : null
  }
}
