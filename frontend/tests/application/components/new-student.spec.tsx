import { NewStudent } from '@/application/components'
import { showNewStudent } from '@/application/utils'

import { fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'
import { fakerBr } from 'js-brasil'
import { RecoilRoot } from 'recoil'
import React from 'react'

describe('NewStudentComponent', () => {
  let onSave: jest.Mock

  beforeAll(() => {
    onSave = jest.fn()
  })

  beforeEach(() => {
    render(
    <RecoilRoot initializeState={({ set }) => set(showNewStudent, true)}>
      <NewStudent onSave={onSave}/>
    </RecoilRoot>)
  })

  test('Should render correctly', () => {
    expect(screen.getByText(/CPF/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite o CPF do estudante/)).toBeInTheDocument()
    expect(screen.getByText(/E-mail/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite o e-mail do estudante/)).toBeInTheDocument()
    expect(screen.getByText(/Nome/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite o nome do estudante/)).toBeInTheDocument()
    expect(screen.getByText(/Salvar/)).toBeInTheDocument()
    expect(screen.queryByTestId('cpfError')).toBeNull()
    expect(screen.queryByTestId('emailError')).toBeNull()
    expect(screen.queryByTestId('nameError')).toBeNull()
  })

  test('Should show cpfError if invalid cpf provided', () => {
    fireEvent.change(screen.getByTestId('nsCpfInput'), { target: { value: faker.datatype.number() } })
    fireEvent.click(screen.getByText(/Salvar/))

    expect(screen.getByTestId('cpfError')).toHaveTextContent('Campo inválido')
  })

  test('Should show emailError if invalid email provided', () => {
    fireEvent.change(screen.getByTestId('nsEmailInput'), { target: { value: faker.random.word() } })
    fireEvent.click(screen.getByText(/Salvar/))

    expect(screen.getByTestId('emailError')).toHaveTextContent('Campo inválido')
  })

  test('Should show errors if required fields are empty', () => {
    fireEvent.click(screen.getByText(/Salvar/))

    expect(screen.getByTestId('emailError')).toHaveTextContent('Campo obrigatório')
    expect(screen.getByTestId('emailError')).toHaveTextContent('Campo obrigatório')
    expect(screen.getByTestId('emailError')).toHaveTextContent('Campo obrigatório')
  })

  test('Should clean error when input change', () => {
    fireEvent.click(screen.getByText(/Salvar/))
    fireEvent.change(screen.getByTestId('nsCpfInput'), { target: { value: fakerBr.cpf() } })
    fireEvent.change(screen.getByTestId('nsEmailInput'), { target: { value: faker.internet.email() } })
    fireEvent.change(screen.getByTestId('nsNameInput'), { target: { value: faker.name.findName() } })

    expect(screen.queryByTestId('cpfError')).toBeNull()
    expect(screen.queryByTestId('emailError')).toBeNull()
    expect(screen.queryByTestId('nameError')).toBeNull()
  })

  test('Should close component', () => {
    fireEvent.click(screen.getByText(/Cancelar/))

    expect(screen.queryByTestId('newStudentWrap')).toBeNull()
  })

  test('Should call onSave with correct values', () => {
    const cpf = fakerBr.cpf()
    const email = faker.internet.email()
    const name = faker.name.findName()

    fireEvent.change(screen.getByTestId('nsCpfInput'), { target: { value: cpf } })
    fireEvent.change(screen.getByTestId('nsEmailInput'), { target: { value: email } })
    fireEvent.change(screen.getByTestId('nsNameInput'), { target: { value: name } })
    fireEvent.click(screen.getByText(/Salvar/))

    expect(onSave).toHaveBeenCalledWith(cpf, email, name)
    expect(onSave).toBeCalledTimes(1)
  })
})
