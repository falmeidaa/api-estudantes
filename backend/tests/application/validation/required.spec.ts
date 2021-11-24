import { MissingParamError } from '@/application/errors'
import { Required } from '@/application/validation'

import faker from 'faker'

type SutTypes = {
  sut: Required
}

const makeSut = (fieldName: string, value: string | number| object | null | undefined): SutTypes => {
  const sut = new Required(value, fieldName)
  return {
    sut
  }
}

describe('RequiredFieldValidator', () => {
  test('Should return an error if validation fails', () => {
    const fieldName = faker.database.column()
    const value = faker.random.arrayElement(['', null, undefined])

    const { sut } = makeSut(fieldName, value)

    const error = sut.validate()

    expect(error).toEqual(new MissingParamError(fieldName))
  })

  test('Should return undefined on success', () => {
    const fieldName = faker.database.column()
    const value = faker.random.arrayElements([faker.random.word(), faker.datatype.number(), faker.random.objectElement()])
    const { sut } = makeSut(fieldName, value)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
