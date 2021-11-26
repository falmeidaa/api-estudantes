import { Student } from '@/domain/entities'

import faker from 'faker'
import { fakerBr } from 'js-brasil'

export const mockStudent = (): Student => ({
  id: faker.datatype.number(),
  cpf: fakerBr.cpf(),
  name: faker.name.findName(),
  email: faker.internet.email()
})
