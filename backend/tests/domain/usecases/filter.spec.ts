import { Student } from '@/domain/entities'
import { Filter } from '@/domain/gateways'
import { FilterStudents, setupFilterStudents } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('Filter usecase', () => {
  let input: Filter.Input
  let output: Filter.Output[]
  let repository: MockProxy<Filter>
  let sut: FilterStudents

  beforeAll(() => {
    input = {
      cpf: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }
    output = [new Student({ id: faker.datatype.number(), cpf: input.cpf!, email: input.email!, name: input.name! })]
    repository = mock()
    repository.filter.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = setupFilterStudents(repository)
  })

  test('Should call repository with correct values', async () => {
    await sut(input)

    expect(repository.filter).toHaveBeenCalledWith(input)
    expect(repository.filter).toHaveBeenCalledTimes(1)
  })

  test('Should rethrow if repository throws', async () => {
    const error = new Error('save_error')
    repository.filter.mockRejectedValueOnce(error)

    const promise = sut(input)

    await expect(promise).rejects.toThrow(error)
  })

  test('Should return an Student on success', async () => {
    const response = await sut(input)

    expect(response).toEqual(output)
  })
})
