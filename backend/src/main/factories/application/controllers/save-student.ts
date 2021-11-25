import { SaveStudentController } from '@/application/controllers'
import { makeSaveStudent } from '@/main/factories/domain/usecases'

export const makeSaveStudentController = (): SaveStudentController => {
  const usecase = makeSaveStudent()
  const controller = new SaveStudentController(usecase)
  return controller
}
