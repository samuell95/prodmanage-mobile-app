import { Alert } from 'react-native'

import { act, renderHook } from '@testing-library/react-native'
import { useUserStore } from './users-storage'
import { api } from '../lib/api'
import { mockResponseUser } from '../../tests/mocks/mockResponseUsers'

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}))

describe('Stores: useUserStore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve adiciona um usuário na memoria', () => {
    const { result } = renderHook(() => useUserStore())

    const user = { id: '1', name: 'John', email: 'john@example.com' }

    act(() => {
      result.current.addUser(user)
    })

    expect(result.current.users).toEqual([user])
  })

  it('deve fazer login com sucesso com credenciais válidas', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: [mockResponseUser] })

    const { result } = renderHook(() => useUserStore())

    await act(async () => {
      await result.current.signIn('sam@example.com', '123456')
    })

    expect(result.current.userInfo).toEqual(mockResponseUser)
  })

  it('deve mostrar um alerta com credenciais inválidas', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: [mockResponseUser] })

    const { result } = renderHook(() => useUserStore())

    await act(async () => {
      await result.current.signIn('invalid@example.com', 'invalidpassword')
    })

    expect(Alert.alert).toHaveBeenCalledWith(
      'Credenciais inválidas',
      'Confira seus dados',
    )
  })

  it('deve sair do app com sucesso', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.logout()
    })

    expect(result.current.userInfo).toBeNull()
  })
})
