import { env } from '@/main/config/env'

export const makeUrl = (path: string): string => {
  return `${env.baseUrl}:${env.port}/api/${path}`
}
