import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { CardProducts } from './cardsProduct'

describe('Componente: CardProducts', () => {
  test('deve renderizar corretamente com nome, estoque e preço', () => {
    render(
      <CardProducts
        name="Produto de Teste Muito Longo"
        stock={10}
        price={100.0}
      />,
    )

    const nameElement = screen.getByText('Produto de Test...')
    const stockElement = screen.getByText('10 em estoque')
    const priceElement = screen.getByText('R$100,00')

    expect(nameElement).toBeTruthy()
    expect(stockElement).toBeTruthy()
    expect(priceElement).toBeTruthy()
  })

  test('deve truncar o nome do produto se for muito longo', () => {
    render(
      <CardProducts
        name="Produto Muito Longo que Excede o Limite de Caracteres Permitido"
        stock={10}
        price={100.0}
      />,
    )

    const nameElement = screen.getByText('Produto Muito L...')

    expect(nameElement).toBeTruthy()
  })
})
