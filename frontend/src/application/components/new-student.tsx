import { Validator, ValidatorComposite, ValidatorBuilder } from '@/application/validation'
import { showNewStudent, cpf as cpfMask } from '@/application/utils'
import './styles.scss'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRecoilState } from 'recoil'
import React, { useState } from 'react'

type State = {
  cpf: string
  email: string
  name: string
  errors: Validator.Output[]
}

type Props = {
  onSave: (cpf: string, email: string, name: string) => void
}

const NewStudent: React.FC<Props> = ({ onSave }: Props) => {
  const [visible, setVisible] = useRecoilState(showNewStudent)

  const [state, setState] = useState<State>({
    cpf: null,
    email: null,
    errors: null,
    name: null
  })

  const validatorComposite = new ValidatorComposite([
    ...ValidatorBuilder.of('cpf').required().cpf().build(),
    ...ValidatorBuilder.of('email').required().email().build(),
    ...ValidatorBuilder.of('name').required().build()
  ])

  const onClose = (): void => {
    setVisible(false)
  }

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

  const handlerSave = (): void => {
    const errors = validatorComposite.validate(state)
    if (errors?.length) {
      setState({ ...state, errors })
      return
    }
    onSave(state.cpf, state.email, state.name)
  }

  const getErrorMessage = (prop: string): string => {
    return state?.errors?.find(error => error.prop === prop)
      ? state?.errors?.find(error => error.prop === prop).error.message
      : ''
  }

  return (
    <Modal
      show={visible}
      onHide={onClose}
      backdrop="static"
      contentClassName="newStudentWrap"
      data-testid="newStudentWrap"
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo estudante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="required">CPF</Form.Label>
            <Form.Control
              maxLength={14}
              name="cpf"
              value={state?.cpf || ''}
              onChange={handlerState}
              placeholder="Digite o CPF do estudante"
              data-testid="nsCpfInput"
            />
              {(state?.errors?.find(error => error.prop === 'cpf')) && <Form.Control.Feedback
                data-testid="cpfError"
                id="error"
                type="invalid"
              >
                {getErrorMessage('cpf')}
              </Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="required">E-mail</Form.Label>
            <Form.Control
              name="email"
              value={state?.email || ''}
              onChange={handlerState}
              placeholder="Digite o e-mail do estudante"
              data-testid="nsEmailInput"
            />
            {(state?.errors?.find(error => error.prop === 'email')) && <Form.Control.Feedback
              data-testid="emailError"
              id="error"
              type="invalid"
            >
                {getErrorMessage('email')}
              </Form.Control.Feedback>}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="required">Nome</Form.Label>
            <Form.Control
              name="name"
              value={state?.name || ''}
              onChange={handlerState}
              placeholder="Digite o nome do estudante"
              data-testid="nsNameInput"
            />
              {(state?.errors?.find(error => error.prop === 'name')) && <Form.Control.Feedback
                data-testid="nameError"
                id="error"
                type="invalid"
              >
                {getErrorMessage('name')}
              </Form.Control.Feedback>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handlerSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewStudent
