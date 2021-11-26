import { CpfValidator, EmailValidator, RequiredValidator } from '.'
import { Validator } from './validator'

export class ValidatorBuilder {
  constructor (
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (fieldName: string): ValidatorBuilder {
    return new ValidatorBuilder(fieldName)
  }

  cpf (): ValidatorBuilder {
    this.validators.push(new CpfValidator(this.fieldName))
    return this
  }

  email (): ValidatorBuilder {
    this.validators.push(new EmailValidator(this.fieldName))
    return this
  }

  required (): ValidatorBuilder {
    this.validators.push(new RequiredValidator(this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
