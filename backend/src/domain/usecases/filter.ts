import { Filter } from '@/domain/gateways'

type Setup = (repository: Filter) => FilterStudents
export type FilterStudents = (input: Filter.Input) => Promise<Filter.Output[]>
export const setupFilterStudents: Setup = (repository) => async input => {
  const students = await repository.filter(input)
  return students
}
