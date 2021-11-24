import { Cpf } from '@/application/validation'
import { InvalidFieldError } from '@/application/errors'

import faker from 'faker'
import { fakerBr } from 'js-brasil'

type SutTypes = {
  sut: Cpf
}

const makeSut = (fieldName: string, value: string): SutTypes => {
  const sut = new Cpf(value, fieldName)
  return {
    sut

  }
}

describe('CpfCnpjValidator', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const fieldName = faker.random.word()
    const value = faker.random.word()
    const { sut } = makeSut(fieldName, value)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return undefined on success', () => {
    const { sut } = makeSut(faker.database.column(), fakerBr.cpf())

    const result = sut.validate()

    expect(result).toBeUndefined()
  })
})
