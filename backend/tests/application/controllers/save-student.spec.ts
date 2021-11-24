import { Controller, SaveStudentController } from '@/application/controllers'
import { Cpf, Email, Required } from '@/application/validation'

import faker from 'faker'
import { fakerBr } from 'js-brasil'

describe('SavePictureController', () => {
  let id: number
  let cpf: string
  let email: string
  let name: string
  let sut: SaveStudentController
  let saveStudent: jest.Mock

  beforeAll(() => {
    id = faker.datatype.number()
    cpf = fakerBr.cpf()
    email = faker.internet.email()
    name = faker.name.findName()
    saveStudent = jest.fn().mockResolvedValue({ id, cpf, email, name })
  })

  beforeEach(() => {
    sut = new SaveStudentController(saveStudent)
  })

  test('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  test('Should build Validators correctly on save', async () => {
    const validators = sut.buildValidators({ cpf, email, name })

    expect(validators).toEqual([
      new Required(cpf, 'cpf'),
      new Cpf(cpf, 'cpf'),
      new Required(email, 'email'),
      new Email(email, 'email'),
      new Required(name, 'name')
    ])
  })

  test('Should call saveStudent with correct input', async () => {
    await sut.handle({ id, cpf, email, name })

    expect(saveStudent).toHaveBeenCalledWith({ id, cpf, email, name })
    expect(saveStudent).toHaveBeenCalledTimes(1)
  })

  test('Should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ id, cpf, email, name })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { id, cpf, email, name }
    })
  })
})
