import { CpfValidator, EmailValidator, RequiredValidator, ValidatorBuilder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let fieldName: string

  beforeAll(() => {
    fieldName = faker.random.word()
  })

  test('Should return CpfValidator', () => {
    const valiators = ValidatorBuilder.of(fieldName).cpf().build()

    expect(valiators).toEqual([new CpfValidator(fieldName)])
  })

  test('Should return EmailValidator', () => {
    const valiators = ValidatorBuilder.of(fieldName).email().build()

    expect(valiators).toEqual([new EmailValidator(fieldName)])
  })

  test('Should return RequiredValidator', () => {
    const valiators = ValidatorBuilder.of(fieldName).required().build()

    expect(valiators).toEqual([new RequiredValidator(fieldName)])
  })
})
