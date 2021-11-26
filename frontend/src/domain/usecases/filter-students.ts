import { HttpClient } from '@/domain/gateways'
import { UnexpectedError } from '@/domain/errors'

type Setup = (httpClient: HttpClient, url: string) => FilterStudents
export type FilterStudents = (input: FilterStudents.Input) => Promise<FilterStudents.Output>
export const setupFilterStudents: Setup = (httpClient, url) => async input => {
  const response = await httpClient.request({ method: 'post', url, body: input })
  switch (response.statusCode) {
    case 200: return response.body
    default: throw new UnexpectedError()
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace FilterStudents{
  export type Input = {
    cpf?: string
    email?: string
    name?: string
  }

  export type Output = Array<{
    id: number
    cpf: string
    email: string
    name: string
  }>
}
