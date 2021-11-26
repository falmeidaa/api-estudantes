import { FilterStudents, setupFilterStudents } from '@/domain/usecases'
import { HttpClient } from '@/domain/gateways'
import { UnexpectedError } from '@/domain/errors'

import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FilterStudents', () => {
  let httpClient: MockProxy<HttpClient>
  let input: FilterStudents.Input
  let output: FilterStudents.Output
  let sut: FilterStudents
  let url: string

  beforeAll(() => {
    input = {
      cpf: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }
    output = [{
      id: faker.datatype.number(),
      cpf: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }, {
      id: faker.datatype.number(),
      cpf: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }, {
      id: faker.datatype.number(),
      cpf: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }]
    url = faker.internet.url()
    httpClient = mock()
    httpClient.request.mockResolvedValue({ statusCode: 200, body: output })
  })

  beforeEach(() => {
    sut = setupFilterStudents(httpClient, url)
  })

  test('Should call httpClient with correct value', async () => {
    await sut(input)

    expect(httpClient.request).toHaveBeenLastCalledWith({ method: 'post', url, body: input })
    expect(httpClient.request).toBeCalledTimes(1)
  })

  test('Should throw UnexpectedError on 500', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: 500,
      body: faker.random.objectElement()
    })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should an student on success', async () => {
    const response = await sut(input)

    expect(response).toEqual(output)
  })
})
