import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react-native'
import { Button } from './button'

describe('Component: Button', () => {
  test('deve renderiza corretamente com título', () => {
    render(<Button title="Entrar" />)

    const button = screen.getByText('Entrar')
    expect(button).toBeTruthy()
  })

  test('deve chamar o callback onPress quando o botão é pressionado', () => {
    const onPressMock = jest.fn()
    render(<Button title="Entrar" onPress={onPressMock} />)

    const button = screen.getByText('Entrar')
    fireEvent.press(button)
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  test('deve ser renderizado sem carregar se a propriedade IsLoading for indefinida', () => {
    render(<Button />)
    const loading = screen.queryByTestId('loading-component')
    expect(loading).toBeNull()
  })

  test('deve ser renderizado sem carregar se a propriedade IsLoading for verdadeira', () => {
    render(<Button isLoading />)
    const loading = screen.getByTestId('loading-component')
    expect(loading).toBeTruthy()
  })
})
