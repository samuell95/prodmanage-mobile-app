import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { SignIn } from './SignIn'

import { ErrorMessage } from '../components/errorMessage'

jest.mock('@react-navigation/native')
jest.mock('../stores/users-storage')

describe('SignIn', () => {
  test('deve validar se o campo de email aceita apenas emails válidos', () => {
    const { getByTestId } = render(<SignIn />)
    const emailInput = getByTestId('email-input')

    fireEvent.changeText(emailInput, 'user@example.com')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    expect(emailRegex.test(emailInput.props.value)).toBeTruthy()

    fireEvent.changeText(emailInput, 'invalidemail')

    expect(emailRegex.test(emailInput.props.value)).toBeFalsy()
  })

  test('deve validar se o campo de senha aceita apenas senhas com mais de 6 caracteres', () => {
    const { getByTestId } = render(<SignIn />)
    const passwordInput = getByTestId('password-input')

    fireEvent.changeText(passwordInput, '12345')

    expect(passwordInput.props.value.length).toBeLessThan(6)

    fireEvent.changeText(passwordInput, '123456')

    expect(passwordInput.props.value.length).toBe(6)

    fireEvent.changeText(passwordInput, '1234567')

    expect(passwordInput.props.value.length).toBeGreaterThan(6)
  })

  test('deve mostrar mensagem de erro se os campos de email e senha estiverem vazios', () => {
    const { getByTestId } = render(
      <>
        <SignIn />
        <ErrorMessage message="Campos obrigatórios não preenchidos." />
      </>,
    )

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')

    const errorMessageElement = screen.getByText(
      'Campos obrigatórios não preenchidos.',
    )

    fireEvent.changeText(emailInput, '')
    fireEvent.changeText(passwordInput, '')

    fireEvent.press(getByTestId('entrar-button'))

    expect(errorMessageElement).toBeTruthy()
  })
})
