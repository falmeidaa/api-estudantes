import { HttpClient } from '@/domain/gateways'
import { UnexpectedError } from '@/domain/errors'

type Setup = (httpClient: HttpClient, url: string) => SaveStudent
export type SaveStudent = (input: SaveStudent.Input) => Promise<SaveStudent.Output>
export const setupSaveStudent: Setup = (httpClient, url) => async input => {
  const response = await httpClient.request({ method: 'post', url, body: input })
  switch (response.statusCode) {
    case 200: return response.body
    default: throw new UnexpectedError()
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace SaveStudent{
  export type Input = {
    id?: number
    cpf: string
    email: string
    name: string
  }

  export type Output = {
    id: number
    cpf: string
    email: string
    name: string
  }
}
