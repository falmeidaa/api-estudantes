import { SaveStudent, setupSaveStudent } from '@/domain/usecases'
import { makePgStudentRepository } from '@/main/factories/infra/postgres/repositories'

export const makeSaveStudent = (): SaveStudent => {
  return setupSaveStudent(makePgStudentRepository())
}
