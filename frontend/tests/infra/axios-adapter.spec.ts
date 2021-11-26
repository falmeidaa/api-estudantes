import { HttpRequest } from '@/domain/gateways'
import { AxiosAdapter } from '@/infra'

import faker from 'faker'
import axios from 'axios'

jest.mock('axios')

describe('AxiosAdapter', () => {
  let sut: AxiosAdapter
  let input: HttpRequest
  let output: any
  let fakeAxios: jest.Mocked<typeof axios>

  beforeAll(() => {
    input = {
      url: faker.internet.url(),
      body: { [faker.random.word()]: faker.random.words() },
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
    }
    output = {
      status: faker.datatype.number(),
      data: { [faker.random.word()]: faker.random.words() }
    }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.request.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = new AxiosAdapter()
  })

  test('Should call axios with correct value', async () => {
    await sut.request(input)

    expect(fakeAxios.request).toHaveBeenCalledWith({
      data: input.body,
      method: input.method,
      headers: input.headers,
      url: input.url
    })
  })

  test('Should return correct response', async () => {
    const response = await sut.request(input)

    expect(response).toEqual({
      statusCode: output.status,
      body: output.data
    })
  })

  test('Should rethrow an error on fail', async () => {
    fakeAxios.request.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.request(input)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
