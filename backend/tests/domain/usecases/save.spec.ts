import { Student } from '@/domain/entities'
import { Save } from '@/domain/gateways'
import { SaveStudent, setupSaveStudent } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('Save usecase', () => {
  let input: Save.Input
  let output: Save.Output
  let repository: MockProxy<Save>
  let sut: SaveStudent

  beforeAll(() => {
    input = {
      id: faker.datatype.number(),
      cpf: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email()
    }
    output = new Student({ id: input.id!, cpf: input.cpf, email: input.email, name: input.name })
    repository = mock()
    repository.save.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = setupSaveStudent(repository)
  })

  test('Should call repository with correct values', async () => {
    await sut(input)

    expect(repository.save).toHaveBeenCalledWith(input)
    expect(repository.save).toHaveBeenCalledTimes(1)
  })

  test('Should rethrow if repository throws', async () => {
    const error = new Error('save_error')
    repository.save.mockRejectedValueOnce(error)

    const promise = sut(input)

    await expect(promise).rejects.toThrow(error)
  })

  test('Should return an Student on success', async () => {
    const response = await sut(input)

    expect(response).toEqual(output)
  })
})
