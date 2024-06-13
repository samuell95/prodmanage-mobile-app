import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { FlatListEmpty } from './flatListEmpty'

describe('Componente: FlatListEmpty', () => {
  test('deve renderizar corretamente com a mensagem fornecida', () => {
    render(<FlatListEmpty />)

    const messageElement = screen.getByText(
      'Desculpe, não foi possível encontrar o produto que você está procurando. A lista está vazia ou o produto não existe.',
    )

    expect(messageElement).toBeTruthy()
  })
})
