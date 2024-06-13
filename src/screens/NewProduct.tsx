import { useNavigation } from '@react-navigation/native'
import { Alert, ScrollView, Text, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../components/input'
import { Button } from '../components/button'

import { ErrorMessage } from '../components/errorMessage'
import { api } from '../lib/api'

import { useProductStore } from '../stores/product-storage'
import { AppNavigationRoutesProps } from '../routes/app.routes'
import { useUserStore } from '../stores/users-storage'

const NewProductSchema = z.object({
  name: z.string().nonempty({ message: 'Digite o nome do produto' }),
  description: z
    .string()
    .nonempty({ message: 'Digite a descrição do produto' }),
  price: z.string().nonempty({ message: 'Digite o preço do produto' }),
  category: z.string().nonempty({ message: 'Digite a categoria do produto' }),
  stock: z.string().nonempty({ message: 'Digite a quantidade do produto' }),
})

type NewProductForm = z.infer<typeof NewProductSchema>

export function NewProduct() {
  const { addProduct } = useProductStore()
  const { userInfo } = useUserStore()

  const navigation = useNavigation<AppNavigationRoutesProps>()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductForm>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
    },
  })

  async function onSubmit({
    category,
    description,
    name,
    price,
    stock,
  }: NewProductForm) {
    try {
      const currentDate = new Date().toISOString()
      const userId = userInfo?.id
      const response = await api.post('products', {
        category,
        description,
        name,
        price,
        stock,
        createdAt: currentDate,
        userId,
      })
      const newProduct = response.data

      addProduct(newProduct)

      navigation.navigate('home')
      reset()
    } catch (error) {
      Alert.alert('Falhou', 'Não foi possível cadastrar seu produto')
    }
  }

  function handleCancel() {
    navigation.navigate('home')
    reset()
  }

  return (
    <View
      className="flex-1 bg-zinc-900 justify-center"
      testID="new-product-screen"
    >
      <ScrollView className="my-12">
        <Text className="text-white text-center text-2xl font-heading mt-5">
          Cadastrar produto
        </Text>

        <View className="mt-10 px-8 space-y-2.5">
          <Text className="text-white text-base font-body mb-1.5">Nome</Text>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field value={value} onChangeText={onChange} />
                </Input>
                <ErrorMessage message={errors.name?.message} />
              </>
            )}
          />

          <Text className="text-white text-base font-body mb-1.5">
            Descrição
          </Text>
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field value={value} onChangeText={onChange} />
                </Input>
                <ErrorMessage message={errors.description?.message} />
              </>
            )}
          />

          <Text className="text-white text-base font-body mb-1.5">Preço</Text>
          <Controller
            name="price"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field
                    keyboardType="decimal-pad"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
                <ErrorMessage message={errors.price?.message} />
              </>
            )}
          />

          <Text className="text-white text-base font-body mb-1.5">
            Categoria
          </Text>
          <Controller
            name="category"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field value={value} onChangeText={onChange} />
                </Input>
                <ErrorMessage message={errors.category?.message} />
              </>
            )}
          />

          <Text className="text-white text-base font-body mb-1.5">Estoque</Text>
          <Controller
            name="stock"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field
                    keyboardType="decimal-pad"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
                <ErrorMessage message={errors.stock?.message} />
              </>
            )}
          />
        </View>
        <View className="px-8 space-y-5 mt-10">
          <Button title="Cadastrar produto" onPress={handleSubmit(onSubmit)} />
          <Button
            title="Cancel"
            onPress={handleCancel}
            className="bg-red-600"
          />
        </View>
      </ScrollView>
    </View>
  )
}
