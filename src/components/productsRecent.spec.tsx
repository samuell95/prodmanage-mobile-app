import React from 'react'
import { render, screen } from '@testing-library/react-native'

import { formatCurrency } from '../utils/functions/formatCurrency'
import { ProductsRecent } from './productsRecent'

describe('Componente: ProductsRecent', () => {
  test('deve renderizar corretamente os elementos de texto e ícone', () => {
    const mockProduct = {
      name: 'Produto de Teste',
      description: 'Descrição do Produto de Teste',
      price: 99.99,
      category: 'Categoria do Produto',
    }

    render(<ProductsRecent {...mockProduct} />)

    expect(
      screen.getByText(mockProduct.name.substring(0, 15) + '...'),
    ).toBeTruthy()
    expect(screen.getByText(formatCurrency(mockProduct.price))).toBeTruthy()
    expect(screen.getByText('Ver mais detalhes')).toBeTruthy()
  })
})
