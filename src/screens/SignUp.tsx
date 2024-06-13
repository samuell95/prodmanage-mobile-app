import { Alert, ScrollView, Text, View } from 'react-native'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { useNavigation } from '@react-navigation/native'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { api } from '../lib/api'

import { useUserStore } from '../stores/users-storage'

const SignUpSchema = z.object({
  name: z.string().nonempty({ message: 'Digite seu nome' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type SignUpForm = z.infer<typeof SignUpSchema>

export function SignUp() {
  const { addUser } = useUserStore()
  const signIn = useUserStore((state) => state.signIn)

  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>()

  async function onSubmit({ email, name, password }: SignUpForm) {
    try {
      const response = await api.post('/users', {
        email,
        name,
        password,
      })
      addUser(response.data)

      await signIn(email, password)
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar usuário. Tente novamente mais tarde',
      )
    }
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <ScrollView className="px-8 my-10" showsHorizontalScrollIndicator={false}>
        <Text className="text-gray-200 text-center text-3xl font-heading mt-12">
          ProdManage
        </Text>
        <Text className="text-gray-400 text-center text-sm mb-10 font-body">
          Simplifique seu gerenciamento de produtos
        </Text>

        <Text className="text-white text-center text-xl font-heading mb-6 mt-9">
          Crie sua conta
        </Text>
        <>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input className="mb-6">
                <Input.Field
                  placeholder="Nome"
                  placeholderTextColor="white"
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
          {errors.name && (
            <Text className="text-red-500">{errors.name.message}</Text>
          )}

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input className="mb-6">
                <Input.Field
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input className="mb-6">
                <Input.Field
                  placeholder="Senha"
                  secureTextEntry
                  placeholderTextColor="white"
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(onSubmit)}
            className="mt-10"
          />
        </>

        <Button
          title="Voltar para o login"
          className="bg-transparent border border-white mt-48"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </View>
  )
}
