import { Save } from '@/domain/gateways'
import { SaveStudent } from '@/domain/usecases'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { id?: number, cpf: string, email: string, name: string }
type Model = Error | Save.Output

export class SaveStudentController extends Controller {
  constructor (private readonly saveStudent: SaveStudent) {
    super()
  }

  async perform ({ id, cpf, email, name }: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.saveStudent({ id, cpf, email, name })
    return ok(response)
  }

  override buildValidators ({ id, cpf, email, name }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: cpf, fieldName: 'cpf' }).required().cpf().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).required().email().build(),
      ...Builder.of({ value: name, fieldName: 'name' }).required().build()

    ]
  }
}
