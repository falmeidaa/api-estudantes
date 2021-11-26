import { EmailValidator, InvalidFieldError } from '@/application/validation'

import faker from 'faker'

describe('EmailValidator', () => {
  let sut: EmailValidator
  let fieldName: string
  let input: any

  beforeAll(() => {
    fieldName = faker.random.word()
    input = {
      [fieldName]: faker.internet.email()
    }
  })

  beforeEach(() => {
    sut = new EmailValidator(fieldName)
  })

  test('Should return undefined on success', () => {
    const output = sut.validate(input)

    expect(output).toBeUndefined()
  })

  test('Should return an error on fail', () => {
    input[fieldName] = faker.datatype.number().toString()
    const output = sut.validate(input)

    expect(output).toEqual({
      prop: fieldName,
      error: new InvalidFieldError()
    })
  })
})
