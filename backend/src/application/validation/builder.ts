import { Cpf, Email, Required, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  cpf (): ValidationBuilder {
    this.validators.push(new Cpf(this.value as string, this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validators.push(new Email(this.value as string, this.fieldName))
    return this
  }

  required (): ValidationBuilder {
    this.validators.push(new Required(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
