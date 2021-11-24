import { Controller, FilterStudentsController } from '@/application/controllers'

import faker from 'faker'
import { fakerBr } from 'js-brasil'

describe('SavePictureController', () => {
  let id: number
  let cpf: string
  let email: string
  let name: string
  let sut: FilterStudentsController
  let filterStudents: jest.Mock

  beforeAll(() => {
    id = faker.datatype.number()
    cpf = fakerBr.cpf()
    email = faker.internet.email()
    name = faker.name.findName()
    filterStudents = jest.fn().mockResolvedValue([{ id, cpf, email, name }])
  })

  beforeEach(() => {
    sut = new FilterStudentsController(filterStudents)
  })

  test('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  test('Should call filterStudents with correct input', async () => {
    await sut.handle({ id, cpf, email, name })

    expect(filterStudents).toHaveBeenCalledWith({ cpf, email, name })
    expect(filterStudents).toHaveBeenCalledTimes(1)
  })

  test('Should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ cpf, email, name })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [{ id, cpf, email, name }]
    })
  })
})
