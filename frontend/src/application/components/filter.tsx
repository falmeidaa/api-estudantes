import { Validator, ValidatorComposite, ValidatorBuilder } from '@/application/validation'
import { cpf as cpfMask } from '@/application/utils'
import './styles.scss'

import { FaFilter } from 'react-icons/fa'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import React, { useState } from 'react'

type State = {
  cpf: string
  email: string
  name: string
  errors: Validator.Output[]
}

type Props = {
  onFilter: (cpf: string, email: string, name: string) => void
}

const Filter: React.FC<Props> = ({ onFilter }: Props) => {
  const [state, setState] = useState<State>({
    cpf: null,
    email: null,
    errors: null,
    name: null
  })

  const validatorComposite = new ValidatorComposite([
    ...ValidatorBuilder.of('cpf').cpf().build(),
    ...ValidatorBuilder.of('email').email().build()
  ])

  const handlerState = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    let { cpf, email, errors, name } = state
    if (errors?.find(error => error.prop === event.target.name)) {
      const index = errors.findIndex(error => error.prop === event.target.name)
      errors.splice(index, 1)
    }
    if (event.target.name === 'cpf') {
      cpf = cpfMask(event.target.value || '')
    }
    if (event.target.name === 'email') {
      email = event.target.value
    }
    if (event.target.name === 'name') {
      name = event.target.value
    }
    setState({ ...state, cpf, email, errors, name })
  }

  const handlerFilter = (): void => {
    const errors = validatorComposite.validate(state)
    if (errors?.length) {
      setState({ ...state, errors })
      return
    }
    onFilter(state.cpf, state.email, state.name)
  }

  const getErrorMessage = (prop: string): string => {
    return state?.errors?.find(error => error.prop === prop)
      ? state?.errors?.find(error => error.prop === prop).error.message
      : ''
  }

  return (
    <Accordion data-testid="filterWrap" className="filterWrap">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <FaFilter/>
          Filtros
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  data-testid="cpfInput"
                  name="cpf"
                  maxLength={14}
                  placeholder="Digite o CPF do estudante"
                  value={state?.cpf || ''}
                  onChange={handlerState}
                />
                {(state?.errors?.find(error => error.prop === 'cpf')) && <Form.Control.Feedback
                  data-testid="cpfError"
                  id="error"
                  type="invalid"
                >
                  {getErrorMessage('cpf')}
                </Form.Control.Feedback>}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  data-testid="emailInput"
                  name="email"
                  placeholder="Digite o e-mail do estudante"
                  value={state?.email || ''}
                  onChange={handlerState}
                />
                {(state?.errors?.find(error => error.prop === 'email')) && <Form.Control.Feedback
                  data-testid="emailError"
                  id="error"
                  type="invalid"
                >
                  {getErrorMessage('email')}
                </Form.Control.Feedback>}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  data-testid="nameInput"
                  name="name"
                  placeholder="Digite o nome do estudante"
                  value={state?.name || ''}
                  onChange={handlerState}
                />
              </Form.Group>
            </Row>
            <div id="buttonContainer" className="d-flex justify-content-end">
              <Button
                variant="success"
                onClick={handlerFilter}
              >
                <FaFilter/>
                Filtrar
              </Button>
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Filter
