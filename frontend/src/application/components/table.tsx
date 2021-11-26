import { cpf as cpfMask, showNewStudent } from '@/application/utils'
import './styles.scss'

import { FaPlus } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  students: Array<{id: number, cpf: string, email: string, name: string}>
}

const TableComponent: React.FC<Props> = ({ students }: Props) => {
  const [, setVisible] = useRecoilState(showNewStudent)

  return (
    <div data-testid="tableWrap" className="tableWrap">
      <div id="tableHeader">
        <h4>Estudantes</h4>
        <Button onClick={() => setVisible(true)}>
          <FaPlus/>
          Novo
        </Button>

      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {students?.map(student => <tr key={student.id}>
            <td>{cpfMask(student.cpf)}</td>
            <td>{student.email}</td>
            <td>{student.name}</td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default TableComponent
