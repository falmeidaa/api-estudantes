import { Save } from '@/domain/gateways'

type Setup = (repository: Save) => SaveStudent
export type SaveStudent = (input: Save.Input) => Promise<Save.Output>
export const setupSaveStudent: Setup = (repository) => async input => {
  return await repository.save(input)
}
