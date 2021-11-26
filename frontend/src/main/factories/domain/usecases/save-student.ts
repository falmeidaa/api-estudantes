import { SaveStudent, setupSaveStudent } from '@/domain/usecases'
import { makeAxiosAdapter, makeUrl } from '@/main/factories/infra'

export const makeSaveStudent = (): SaveStudent => {
  const url = makeUrl('/students')
  const httpClient = makeAxiosAdapter()
  return setupSaveStudent(httpClient, url)
}
