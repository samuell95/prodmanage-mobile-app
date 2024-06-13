import { Alert, ScrollView, Text, View } from 'react-native'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { z } from 'zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RoutesParamsProps } from './DetailsProduct'
import { AppNavigationRoutesProps } from '../routes/app.routes'
import { useProductStore } from '../stores/product-storage'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../lib/api'
import { ErrorMessage } from '../components/errorMessage'

const EditProductSchema = z.object({
  name: z.string().nonempty({ message: 'Digite o nome do produto' }),
  description: z
    .string()
    .nonempty({ message: 'Digite a descrição do produto' }),
  price: z.string().nonempty({ message: 'Digite o preço do produto' }),
  category: z.string().nonempty({ message: 'Digite a categoria do produto' }),
  stock: z.string().nonempty({ message: 'Digite a quantidade do produto' }),
})

type EditProductForm = z.infer<typeof EditProductSchema>

export function EditProduct() {
  const route = useRoute()
  const { products, updateProduct, setProductInfo } = useProductStore()

  const navigation = useNavigation<AppNavigationRoutesProps>()
  const { productId } = route.params as RoutesParamsProps

  const product = products.find((p) => p.id === productId)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProductForm>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      name: product?.name || '',
      description: product!.description || '',
      price: product!.price || '',
      category: product!.category || '',
      stock: product!.stock || '',
    },
  })

  function handleCancel() {
    navigation.goBack()
    reset()
  }

  async function onSubmit(data: EditProductForm) {
    try {
      const updatedProduct = { ...product, ...data }

      const response = await api.put(`products/${productId}`, updatedProduct)

      const productMemory = response.data

      updateProduct(productMemory)
      setProductInfo(productMemory)

      navigation.goBack()
    } catch (error) {
      Alert.alert('Falhou', 'Não foi possível atualizar seu produto')
    }
  }

  return (
    <View className="flex-1 bg-zinc-900 justify-center">
      <Text className="text-white text-center text-2xl font-heading mt-24">
        Editar produto
      </Text>

      <ScrollView>
        <View className="mt-10 px-8 space-y-5">
          <Text className="text-white text-base font-body mb-2">Nome</Text>
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
          <Text className="text-white text-base font-body mb-2">Descrição</Text>
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
          <Text className="text-white text-base font-body mb-2">Preço</Text>
          <Controller
            name="price"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field value={value} onChangeText={onChange} />
                </Input>
                <ErrorMessage message={errors.price?.message} />
              </>
            )}
          />
          <Text className="text-white text-base font-body mb-2">Categoria</Text>
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
          <Text className="text-white text-base font-body mb-2">Estoque</Text>
          <Controller
            name="stock"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input>
                  <Input.Field value={value} onChangeText={onChange} />
                </Input>
                <ErrorMessage message={errors.stock?.message} />
              </>
            )}
          />
        </View>
        <View className="flex-row justify-between gap-2 px-5 mt-10">
          <Button
            title="Cancelar"
            onPress={handleCancel}
            className="flex-1 bg-zinc-500"
          />
          <Button
            title="Atualizar"
            onPress={handleSubmit(onSubmit)}
            className="flex-1 bg-black"
          />
        </View>
      </ScrollView>
    </View>
  )
}
