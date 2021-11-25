import { FilterStudents, setupFilterStudents } from '@/domain/usecases'
import { makePgStudentRepository } from '@/main/factories/infra/postgres/repositories'

export const makeFilterStudents = (): FilterStudents => {
  const repository = makePgStudentRepository()
  return setupFilterStudents(repository)
}
