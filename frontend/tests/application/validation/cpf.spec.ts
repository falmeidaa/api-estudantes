import { CpfValidator, InvalidFieldError } from '@/application/validation'

import faker from 'faker'
import { fakerBr } from 'js-brasil'

describe('CpfValidator', () => {
  let sut: CpfValidator
  let fieldName: string
  let input: any

  beforeAll(() => {
    fieldName = faker.random.word()
    input = {
      [fieldName]: fakerBr.cpf()
    }
  })

  beforeEach(() => {
    sut = new CpfValidator(fieldName)
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
