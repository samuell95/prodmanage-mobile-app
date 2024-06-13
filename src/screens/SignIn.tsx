import { ScrollView, Text, View } from 'react-native'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { useNavigation } from '@react-navigation/native'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '../components/errorMessage'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUserStore } from '../stores/users-storage'

import { AuthNavigationRoutesProps } from '../routes/auth.routes'
import { useState } from 'react'

const SignInSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido' }),
  password: z.string().nonempty({ message: 'Insira sua senha' }),
})

type SignInForm = z.infer<typeof SignInSchema>

export function SignIn() {
  const navigation = useNavigation<AuthNavigationRoutesProps>()
  const [isLoading, setIsLoading] = useState(false)
  const signIn = useUserStore((state) => state.signIn)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  })

  async function onSubmit(data: SignInForm) {
    try {
      setIsLoading(true)
      const { email, password } = data
      await signIn(email, password)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp')
  }
  return (
    <View className="flex-1 bg-zinc-900">
      <ScrollView
        className="w-full px-8 my-10"
        showsHorizontalScrollIndicator={false}
      >
        <Text className="text-gray-200 text-center text-3xl font-heading mt-14">
          ProdManage
        </Text>
        <Text className="text-gray-400 text-center text-sm mb-10 font-body">
          Simplifique seu gerenciamento de produtos
        </Text>

        <Text className="text-white text-center text-xl font-heading mb-6 mt-16">
          Acesse sua conta
        </Text>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input>
                <Input.Field
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="white"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  testID="email-input"
                />
              </Input>
              <ErrorMessage message={errors.email?.message} className="mb-4" />
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input>
                <Input.Field
                  placeholder="Senha"
                  secureTextEntry
                  placeholderTextColor="white"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  testID="password-input"
                />
              </Input>
              <ErrorMessage
                message={errors.password?.message}
                className="mb-6"
              />
            </>
          )}
        />
        <Button
          testID="entrar-button"
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
          className="mt-5"
        />

        <Text className="text-white text-center text-sm font-body mb-6 mt-40">
          Ainda não tem acesso?
        </Text>
        <Button
          title="Criar conta"
          className="bg-transparent border border-white"
          onPress={handleNewAccount}
          isLoading={isLoading}
        />
      </ScrollView>
    </View>
  )
}
