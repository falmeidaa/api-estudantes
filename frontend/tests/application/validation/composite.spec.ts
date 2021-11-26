import { Validator, ValidatorComposite } from '@/application/validation'

import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ValidatorComposite', () => {
  let sut: ValidatorComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let input: any
  const validators: Validator[] = []

  beforeAll(() => {
    input = { prop: faker.random.word() }
    validator1 = mock()
    validator2 = mock()
    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)
    validators.push(validator1, validator2)
  })

  beforeEach(() => {
    sut = new ValidatorComposite(validators)
  })

  test('Should return undefined on success', () => {
    const output = sut.validate(input)

    expect(output).toBeNull()
  })

  test('Should return all errors', () => {
    validator1.validate.mockReturnValueOnce({ prop: 'prop', error: new Error('first error') })
    validator2.validate.mockReturnValueOnce({ prop: 'prop', error: new Error('second error') })

    const output = sut.validate(input)

    expect(output).toEqual([{ prop: 'prop', error: new Error('first error') },
      { prop: 'prop', error: new Error('second error') }])
  })
})
