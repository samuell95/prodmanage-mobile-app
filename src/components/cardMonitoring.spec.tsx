import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { CardsMonitoring } from './cardsMonitoring'

describe('Componente: CardsMonitoring', () => {
  test('deve renderizar corretamente com título e total', () => {
    render(<CardsMonitoring title="Título do Card" total={10} />)

    const titleElement = screen.getByText('Título do Card')
    const totalElement = screen.getByText('10')

    expect(titleElement).toBeTruthy()
    expect(totalElement).toBeTruthy()
  })

  test('deve renderizar corretamente sem título e total', () => {
    render(<CardsMonitoring />)

    const titleElement = screen.queryByText('Título do Card')
    const totalElement = screen.queryByText('10')

    expect(titleElement).toBeNull()
    expect(totalElement).toBeNull()
  })
})
