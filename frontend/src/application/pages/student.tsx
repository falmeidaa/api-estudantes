import { SaveStudent, FilterStudents } from '@/domain/usecases'
import { Student } from '@/domain/entities'
import { Filter, Header, NewStudent, Table } from '@/application/components'

import Container from 'react-bootstrap/Container'
import { RecoilRoot } from 'recoil'
import React, { useEffect, useState } from 'react'

type Props = {
  filterStudents: FilterStudents
  saveStudent: SaveStudent
}

type State = {
  students: Student[]
  filter: {
    cpf: string
    email: string
    name: string
  }
}

const StudentPage: React.FC<Props> = ({ filterStudents, saveStudent }: Props) => {
  const [state, setState] = useState<State>({
    students: null as Student[],
    filter: {
      cpf: null,
      email: null,
      name: null
    }
  })

  useEffect(() => {
    loadPage()
  }, [state.filter])

  const onFilter = (cpf: string, email: string, name: string): void => {
    setState({ ...state, filter: { cpf, email, name } })
  }

  const onSave = (cpf: string, email: string, name: string): void => {
    saveStudent({ cpf, email, name })
      .then(() => {
        loadPage()
      })
  }

  const loadPage = (): void => {
    filterStudents(state?.filter)
      .then(res => {
        setState({ ...state, students: res })
      })
  }

  return (
    <RecoilRoot>
      <div data-testid="studentPageWrap">
        <Header/>
        <Container>
          <Filter onFilter={onFilter}/>
          <Table students={state?.students}/>
        </Container>
        <NewStudent onSave={onSave}/>
      </div>
    </RecoilRoot>
  )
}

export default StudentPage
