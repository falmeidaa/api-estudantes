import { Filter } from '@/domain/gateways'
import { FilterStudents } from '@/domain/usecases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'

type HttpRequest = { id?: number, cpf: string, email: string, name: string }
type Model = Error | Filter.Output[]

export class FilterStudentsController extends Controller {
  constructor (private readonly filterStudents: FilterStudents) {
    super()
  }

  async perform ({ cpf, email, name }: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.filterStudents({ cpf, email, name })
    return ok(response)
  }
}
