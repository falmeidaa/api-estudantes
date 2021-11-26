import { StudentPage } from '@/application/pages'
import { mockStudent } from '~/mocks/student'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { fakerBr } from 'js-brasil'
import faker from 'faker'

describe('StudentPage', () => {
  let filterStudents: jest.Mock
  let saveStudent: jest.Mock

  beforeAll(() => {
    filterStudents = jest.fn()
    saveStudent = jest.fn()
    filterStudents.mockResolvedValue([mockStudent(), mockStudent()])
    saveStudent.mockResolvedValue(mockStudent())
  })

  beforeEach(async () => {
    render(
    <StudentPage
      filterStudents={filterStudents}
      saveStudent={saveStudent}
    />)
    await waitFor(() => screen.getByTestId('studentPageWrap'))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should render correctly', () => {
    expect(screen.getByTestId('headerWrap')).toBeInTheDocument()
    expect(screen.getByTestId('filterWrap')).toBeInTheDocument()
    expect(screen.getByTestId('tableWrap')).toBeInTheDocument()

    expect(filterStudents).toHaveBeenCalledWith({ cpf: null, email: null, name: null })
    expect(filterStudents).toBeCalledTimes(1)
  })

  test('Should call filterStudents onFilter', async () => {
    filterStudents.mockClear()
    const cpf = fakerBr.cpf()
    const email = faker.internet.email()
    const name = faker.name.findName()

    fireEvent.change(screen.getByTestId('cpfInput'), { target: { value: cpf } })
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: email } })
    fireEvent.change(screen.getByTestId('nameInput'), { target: { value: name } })
    fireEvent.click(screen.getByText(/Filtrar/))
    await waitFor(() => screen.getByTestId('studentPageWrap'))

    expect(filterStudents).toHaveBeenCalledWith({ cpf, email, name })
    expect(filterStudents).toBeCalledTimes(1)
  })

  test('Should call saveStudent onSave', async () => {
    filterStudents.mockClear()
    const cpf = fakerBr.cpf()
    const email = faker.internet.email()
    const name = faker.name.findName()

    fireEvent.click(screen.getByText(/Novo/))
    fireEvent.change(screen.getByTestId('nsCpfInput'), { target: { value: cpf } })
    fireEvent.change(screen.getByTestId('nsEmailInput'), { target: { value: email } })
    fireEvent.change(screen.getByTestId('nsNameInput'), { target: { value: name } })
    fireEvent.click(screen.getByText(/Salvar/))
    await waitFor(() => screen.getByTestId('studentPageWrap'))

    expect(saveStudent).toHaveBeenCalledWith({ cpf, email, name })
    expect(saveStudent).toBeCalledTimes(1)
    expect(filterStudents).toHaveBeenCalledWith({ cpf: null, email: null, name: null })
    expect(filterStudents).toBeCalledTimes(1)
  })
})
