import { AxiosAdapter } from '@/infra'

export const makeAxiosAdapter = (): AxiosAdapter => {
  return new AxiosAdapter()
}
