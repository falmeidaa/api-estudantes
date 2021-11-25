import { PgStudentRepository } from '@/infra/postgres/repositories'

export const makePgStudentRepository = (): PgStudentRepository => {
  return new PgStudentRepository()
}
