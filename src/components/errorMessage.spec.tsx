import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { ErrorMessage } from './errorMessage'

describe('Componente: ErrorMessage', () => {
  test('deve renderizar corretamente com uma mensagem de erro fornecida', () => {
    render(<ErrorMessage message="Erro ao carregar dados" />)

    const errorMessageElement = screen.getByText('Erro ao carregar dados')

    expect(errorMessageElement).toBeTruthy()
  })

  test('deve renderizar sem ocupar espaço quando a mensagem de erro é undefined', () => {
    render(<ErrorMessage />)

    const errorMessageContainer = screen.getByTestId('error-message-container')

    expect(errorMessageContainer.props.style.height).toBeUndefined()
  })
})
