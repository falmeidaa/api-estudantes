import { Student } from '@/domain/entities'

export interface Save {
  save: (input: Save.Input) => Promise<Save.Output>
}

export interface Filter {
  filter: (input: Filter.Input) => Promise<Filter.Output[]>
}

export namespace Save{
  export type Input = {
    id?: number
    cpf: string
    email: string
    name: string
  }
  export type Output = Student
}

export namespace Filter{
  export type Input = {
    cpf?: string
    email?: string
    name?: string
  }
  export type Output = Student
}
