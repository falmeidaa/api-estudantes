import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeSaveStudentController, makeFilterStudentsController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/students', adapt(makeSaveStudentController()))
  router.post('/students/filter', adapt(makeFilterStudentsController()))
}
