import { Header } from '@/application/components'

import { render, screen } from '@testing-library/react'
import React from 'react'

describe('HeaderComponent', () => {
  beforeEach(() => {
    render(<Header/>)
  })

  test('Should render correctly', () => {
    const src = screen.getByTestId('logo').getAttribute('src')

    expect(src).toBe('https://www.waproject.com.br/assets/image/logo.svg')
  })
})
