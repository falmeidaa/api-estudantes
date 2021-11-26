import { HttpClient, HttpRequest, HttpResponse } from '@/domain/gateways'

import axios from 'axios'

export class AxiosAdapter implements HttpClient {
  async request (input: HttpRequest): Promise<HttpResponse> {
    const response = await axios.request({
      method: input.method,
      data: input.body,
      headers: input.headers,
      url: input.url
    })
    return {
      body: response.data,
      statusCode: response.status
    }
  }
}
