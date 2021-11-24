import { PgStudent } from '@/infra/postgres/entities'
import { PgStudentRepository } from '@/infra/postgres/repositories'
import { makeFakeDb } from '~/infra/mocks'

import { getRepository, Repository, getConnection } from 'typeorm'
import { IBackup } from 'pg-mem'

describe('PgStudent', () => {
  let sut: PgStudentRepository
  let repository: Repository<PgStudent>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgStudent])
    backup = db.backup()
    repository = getRepository(PgStudent)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgStudentRepository()
  })

  describe('save', () => {
    test('Should not save when cpf or email is already exists', async () => {
      await repository.save({ cpf: 'any_cpf', email: 'any_email', name: 'any_name' })
      let promise = repository.save({ cpf: 'any_cpf', email: 'another_email', name: 'any_name' })

      await expect(promise).rejects.toThrow()

      promise = repository.save({ cpf: 'another_cpf', email: 'any_email', name: 'any_name' })

      await expect(promise).rejects.toThrow()
    })

    test('Should return an student on success', async () => {
      const student = await sut.save({ cpf: 'any_cpf', email: 'any_email', name: 'any_name' })

      expect(student).toEqual({ id: 1, cpf: 'any_cpf', email: 'any_email', name: 'any_name' })
    })
  })

  describe('filter', () => {
    beforeEach(async () => {
      await repository.save([
        { cpf: 'any_cpf', email: 'any_email', name: 'any_name' },
        { cpf: 'another_cpf', email: 'another_email', name: 'any_name' }
      ])
    })

    test('Should return an filtered list of students', async () => {
      let response = await sut.filter({ name: 'any_name' })
      expect(response).toEqual([
        { id: 1, cpf: 'any_cpf', email: 'any_email', name: 'any_name' },
        { id: 2, cpf: 'another_cpf', email: 'another_email', name: 'any_name' }
      ])

      response = await sut.filter({ cpf: 'any_cpf' })
      expect(response).toEqual([
        { id: 1, cpf: 'any_cpf', email: 'any_email', name: 'any_name' }
      ])

      response = await sut.filter({ email: 'any_email' })
      expect(response).toEqual([
        { id: 1, cpf: 'any_cpf', email: 'any_email', name: 'any_name' }
      ])
    })
  })
})
