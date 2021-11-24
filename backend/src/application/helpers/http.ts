import { ServerError, UnexpectedError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const serverError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  data: error instanceof Error
    ? new ServerError(error)
    : new UnexpectedError()
})
