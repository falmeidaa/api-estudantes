import { Student } from '@/domain/entities'

import faker from 'faker'

export const mockStudent = (): Student => ({
  id: faker.datatype.number(),
  cpf: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email()
})
