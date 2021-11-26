import { RequiredFieldError, RequiredValidator } from '@/application/validation'

import faker from 'faker'

describe('RequiredValidator', () => {
  let sut: RequiredValidator
  let fieldName: string
  let input: any

  beforeAll(() => {
    fieldName = faker.random.word()
    input = {
      [fieldName]: faker.random.words()
    }
  })

  beforeEach(() => {
    sut = new RequiredValidator(fieldName)
  })

  test('Should return undefined on success', () => {
    const output = sut.validate(input)

    expect(output).toBeUndefined()
  })

  test('Should return an error on fail', () => {
    input[fieldName] = ''
    const output = sut.validate(input)

    expect(output).toEqual({
      prop: fieldName,
      error: new RequiredFieldError()
    })
  })
})
