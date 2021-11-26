import { StudentPage } from '@/application/pages'
import { makeFilterStudents, makeSaveStudent } from '@/main/factories/domain/usecases'

import React from 'react'

export const makeStudentPage: React.FC = () => {
  return (
    <StudentPage
      filterStudents={makeFilterStudents()}
      saveStudent={makeSaveStudent()}
    />
  )
}
