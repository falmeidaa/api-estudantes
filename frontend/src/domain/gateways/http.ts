export interface HttpClient{
  request: (input: HttpRequest) => Promise<HttpResponse>
}

export type HttpRequest<T = any> = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: T
  headers?: any
}

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}
