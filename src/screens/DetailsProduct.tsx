import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import { Alert, Text, TextInput, View } from 'react-native'
import { Button } from '../components/button'
import { AppNavigationRoutesProps } from '../routes/app.routes'
import { api } from '../lib/api'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../utils/functions/formatCurrency'
import { useProductStore } from '../stores/product-storage'
import { useUserStore } from '../stores/users-storage'
import { Loading } from '../components/loading'

export type RoutesParamsProps = {
  productId: string
}

export function DetailsProduct() {
  const { removeProduct, productInfo, setProductInfo, clearProductInfo } =
    useProductStore()
  const [isLoading, setIsLoading] = useState(false)
  const { userInfo } = useUserStore()
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const route = useRoute()

  const { productId } = route.params as RoutesParamsProps

  async function fetchProductsDetails() {
    setIsLoading(true)
    try {
      const response = await api.get(`products/${productId}`)
      setProductInfo(response.data)
    } catch (error) {
      console.error('Failed to fetch product details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsDetails()
  }, [productId])

  async function handleDeleteProduct() {
    try {
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja apagar este produto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await api.delete(`products/${productId}`)
                Alert.alert('Sucesso ✅', 'Seu produto foi apagado com sucesso')
                removeProduct(productId)
                clearProductInfo()
                navigation.navigate('home')
              } catch {
                Alert.alert('Falhou ❌', 'Não foi possível apagar seu produto')
              }
            },
          },
        ],
      )
    } catch {
      Alert.alert('Falhou ❌', 'Não foi possível apagar seu produto')
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-zinc-900 ">
      <View className="px-8 pb-4 pt-16 flex-row items-center bg-zinc-800">
        <ArrowLeft color={'white'} onPress={() => navigation.goBack()} />
        <Text className="text-white flex-1 text-center text-xl font-heading">
          Detalhes do produto
        </Text>
      </View>

      <View className="px-8 mt-10 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-heading">
            {productInfo?.name}
          </Text>
          <Text className="text-white text-xl font-heading">
            {formatCurrency(Number(productInfo?.price))}
          </Text>
        </View>
        <Text className="text-white text-lg font-heading mt-10">Descrição</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          className="h-32 bg-zinc-700 rounded-md px-4 py-3 font-body text-base mt-2 placeholder:text-lg"
          placeholderTextColor="white"
          placeholder={productInfo?.description}
          editable={false}
        />
        <Text className="text-white text-lg font-heading mt-10">Categoria</Text>
        <TextInput
          className="bg-zinc-700 rounded-md px-4 py-3 font-body text-base mt-2 placeholder:text-lg"
          placeholderTextColor="white"
          placeholder={productInfo?.category}
          editable={false}
        />
        <Text className="text-white text-lg font-heading mt-10">Estoque</Text>
        <TextInput
          className="bg-zinc-700 rounded-md px-4 py-3 font-body text-base mt-2 placeholder:text-lg"
          placeholderTextColor="white"
          placeholder={productInfo?.stock}
          editable={false}
        />
      </View>

      {productInfo?.userId === userInfo?.id ? (
        <View className="flex-row justify-between mb-10 px-5 gap-4">
          <Button
            title="Editar"
            className="flex-1 bg-blue-600"
            onPress={() => navigation.navigate('edit', { productId })}
          />
          <Button
            title="Excluir"
            className="flex-1 bg-red-600"
            onPress={() => handleDeleteProduct()}
          />
        </View>
      ) : null}
    </View>
  )
}
