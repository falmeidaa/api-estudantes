import { FilterStudents, setupFilterStudents } from '@/domain/usecases'
import { makeAxiosAdapter, makeUrl } from '@/main/factories/infra'

export const makeFilterStudents = (): FilterStudents => {
  const url = makeUrl('/students/filter')
  const httpClient = makeAxiosAdapter()
  return setupFilterStudents(httpClient, url)
}
