import { create } from 'zustand'
import { api } from '../lib/api'
import { Alert } from 'react-native'

export interface User {
  id: string
  name: string
  email: string
  password?: string
}

type UserStore = {
  users: User[]
  userInfo: User | null
  addUser: (user: User) => void
  signIn: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  userInfo: null,

  addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),

  signIn: async (email: string, password: string) => {
    try {
      const response = await api.get('/users')
      const users = response.data

      const user = users.find(
        (u: any) => u.email === email && u.password === password,
      )

      if (user) {
        set({ userInfo: user })
      } else {
        Alert.alert('Credenciais inválidas', 'Confira seus dados')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  },

  logout: () => {
    set({ userInfo: null })
  },
}))
