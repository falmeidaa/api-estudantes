import { Filter, Save } from '@/domain/gateways'
import { PgStudent } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

export class PgStudentRepository implements Filter, Save {
  async filter (input: Filter.Input): Promise<Filter.Output[]> {
    const pgRepository = getRepository(PgStudent)
    const output = await pgRepository.find({ where: [{ cpf: input.cpf }, { email: input.email }, { name: input.name }] })
    return output
  }

  async save (input: Save.Input): Promise<Save.Output> {
    const pgRepository = getRepository(PgStudent)
    const output = await pgRepository.save(input)
    return output
  }
}
