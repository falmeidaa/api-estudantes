import { FilterStudentsController } from '@/application/controllers'
import { makeFilterStudents } from '@/main/factories/domain/usecases'

export const makeFilterStudentsController = (): FilterStudentsController => {
  const usecase = makeFilterStudents()
  const controller = new FilterStudentsController(usecase)
  return controller
}
