export interface Validator{
  validate: (input: any) => Validator.Output | undefined
}

export namespace Validator{
  export type Output = {
    prop: string
    error: Error
  }
}
