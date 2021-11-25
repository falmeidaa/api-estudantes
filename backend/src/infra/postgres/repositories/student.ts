/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Filter, Save } from '@/domain/gateways'
import { PgStudent } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

export class PgStudentRepository implements Filter, Save {
  async filter (input: Filter.Input): Promise<Filter.Output[]> {
    const query = getRepository(PgStudent).createQueryBuilder('student')
    if (input.cpf) {
      query.where('student.cpf = :cpf', { cpf: input.cpf })
    }
    if (input.email) {
      query.where('student.email = :email', { email: input.email })
    }
    if (input.name) {
      query.where('student.name = :name', { name: input.name })
    }
    const output = await query.getMany()
    return output
  }

  async save (input: Save.Input): Promise<Save.Output> {
    const pgRepository = getRepository(PgStudent)
    const output = await pgRepository.save(input)
    return output
  }
}
