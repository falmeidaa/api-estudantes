/* eslint-disable import/export */
export class Student {
  id: number
  cpf: string
  email: string
  name: string

  constructor ({ id, cpf, email, name }: Student.Input) {
    this.id = id
    this.cpf = cpf
    this.email = email
    this.name = name
  }
}

export namespace Student{
  export interface Input {
    id: number
    cpf: string
    email: string
    name: string
  }
}
