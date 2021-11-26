import { Student } from '@/domain/entities'
import { Table } from '@/application/components'
import { showNewStudent } from '@/application/utils'
import { mockStudent } from '~/mocks/student'

import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import React from 'react'

describe('TableComponent', () => {
  let student1: Student
  let student2: Student
  let students: Array<{id: number, cpf: string, email: string, name: string}>

  beforeAll(() => {
    student1 = mockStudent()
    student2 = mockStudent()
    students = [student1, student2]
  })

  beforeEach(() => {
    render(
      <RecoilRoot initializeState={({ set }) => set(showNewStudent, true)}>
        <Table students={students}/>
      </RecoilRoot>
    )
  })

  test('Should render correctly', () => {
    expect(screen.getByText(/Estudantes/)).toBeInTheDocument()
    expect(screen.getByText(/Novo/)).toBeInTheDocument()
    expect(screen.getByText(/CPF/)).toBeInTheDocument()
    expect(screen.getByText(/E-mail/)).toBeInTheDocument()
    expect(screen.getByText(/Nome/)).toBeInTheDocument()
    expect(screen.getByText(student1.cpf)).toBeInTheDocument()
    expect(screen.getByText(student1.email)).toBeInTheDocument()
    expect(screen.getByText(student1.name)).toBeInTheDocument()
    expect(screen.getByText(student2.cpf)).toBeInTheDocument()
    expect(screen.getByText(student2.email)).toBeInTheDocument()
    expect(screen.getByText(student2.name)).toBeInTheDocument()
  })
})
