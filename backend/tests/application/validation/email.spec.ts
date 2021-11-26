import { Email } from '@/application/validation'
import { InvalidFieldError } from '@/application/errors'

import faker from 'faker'

type SutTypes = {
  sut: Email
}

const makeSut = (fieldName: string, value: string): SutTypes => {
  const sut = new Email(value, fieldName)
  return {
    sut

  }
}

describe('CpfValidator', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const fieldName = faker.random.word()
    const value = faker.random.word()
    const { sut } = makeSut(fieldName, value)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return undefined on success', () => {
    const { sut } = makeSut(faker.database.column(), faker.internet.email())

    const result = sut.validate()

    expect(result).toBeUndefined()
  })
})
