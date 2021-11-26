import { Filter } from '@/application/components'

import { fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'
import { fakerBr } from 'js-brasil'
import React from 'react'

describe('FilterComponent', () => {
  let onFilter: jest.Mock

  beforeAll(() => {
    onFilter = jest.fn()
  })

  beforeEach(() => {
    render(<Filter onFilter={onFilter}/>)
  })

  test('Should initialize collapsed', async () => {
    const ariaExpanded = screen.getByTestId('filterWrap').querySelector('button').getAttribute('aria-expanded')

    expect(ariaExpanded).toBe('false')
  })

  test('Should expand on click', async () => {
    const ariaExpanded = screen.getByTestId('filterWrap').querySelector('button')

    fireEvent.click(ariaExpanded)

    expect(ariaExpanded.getAttribute('aria-expanded')).toBe('true')
  })

  test('Should render correctly', () => {
    expect(screen.getByText(/CPF/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite o CPF do estudante/)).toBeInTheDocument()
    expect(screen.getByText(/E-mail/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite o e-mail do estudante/)).toBeInTheDocument()
    expect(screen.getByText(/Nome/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite o nome do estudante/)).toBeInTheDocument()
    expect(screen.getByText(/Filtrar/)).toBeInTheDocument()
    expect(screen.queryByTestId('cpfError')).toBeNull()
    expect(screen.queryByTestId('emailError')).toBeNull()
  })

  test('Should show cpfError if invalid cpf provided', () => {
    fireEvent.change(screen.getByTestId('cpfInput'), { target: { value: faker.datatype.number() } })
    fireEvent.click(screen.getByText(/Filtrar/))

    expect(screen.getByTestId('cpfError')).toHaveTextContent('Campo inválido')
  })

  test('Should show emailError if invalid email provided', () => {
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: faker.random.word() } })
    fireEvent.click(screen.getByText(/Filtrar/))

    expect(screen.getByTestId('emailError')).toHaveTextContent('Campo inválido')
  })

  test('Should clean error when input change', () => {
    fireEvent.change(screen.getByTestId('cpfInput'), { target: { value: faker.datatype.number() } })
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: faker.random.word() } })
    fireEvent.click(screen.getByText(/Filtrar/))
    fireEvent.change(screen.getByTestId('cpfInput'), { target: { value: fakerBr.cpf() } })
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: faker.internet.email() } })

    expect(screen.queryByTestId('cpfError')).toBeNull()
    expect(screen.queryByTestId('emailError')).toBeNull()
  })

  test('Should call onFilter with correct values', () => {
    const cpf = fakerBr.cpf()
    const email = faker.internet.email()
    const name = faker.name.findName()

    fireEvent.change(screen.getByTestId('cpfInput'), { target: { value: cpf } })
    fireEvent.change(screen.getByTestId('emailInput'), { target: { value: email } })
    fireEvent.change(screen.getByTestId('nameInput'), { target: { value: name } })
    fireEvent.click(screen.getByText(/Filtrar/))

    expect(onFilter).toHaveBeenCalledWith(cpf, email, name)
    expect(onFilter).toBeCalledTimes(1)
  })
})
