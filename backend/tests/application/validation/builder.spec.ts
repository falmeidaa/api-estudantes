import { Cpf, Email, Required, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  test('Should return Required', () => {
    const validators = ValidationBuilder
      .of({ value: { any: 'any' } })
      .required()
      .build()

    expect(validators).toEqual([new Required({ any: 'any' })])
  })

  test('Should return Cpf', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_cpf' })
      .cpf()
      .build()

    expect(validators).toEqual([new Cpf('any_cpf')])
  })

  test('Should return Email', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_email' })
      .email()
      .build()

    expect(validators).toEqual([new Email('any_email')])
  })
})
