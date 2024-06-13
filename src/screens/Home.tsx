import { FlatList, Text, View } from 'react-native'
import { HomeHeader } from '../components/homeHeader'

import { CardsMonitoring } from '../components/cardsMonitoring'
import { useEffect, useState } from 'react'

import { ProductsRecent } from '../components/productsRecent'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '../routes/app.routes'
import { useProductStore } from '../stores/product-storage'
import { Loading } from '../components/loading'

export function Home() {
  const { products, fetchProducts } = useProductStore()
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleOpenProductsDetails(productId: string) {
    navigation.navigate('details', { productId })
  }

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      await fetchProducts()
      setIsLoading(false)
    }

    loadProducts()
  }, [fetchProducts])

  const lowStockProductsCount = products.filter(
    (p) => Number(p.stock) < 10,
  ).length
  const recentProducts = products
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10)
    .slice(0, 5)

  return (
    <View className="flex-1 bg-zinc-900" testID="home-screen">
      <HomeHeader />
      <View className="mt-10 justify-between px-8">
        <CardsMonitoring title="Total de Produtos" total={products.length} />
        <CardsMonitoring
          title="Produtos com Baixo Estoque"
          total={lowStockProductsCount}
        />
      </View>

      <Text className="text-center text-white text-lg font-heading mt-6 -mb-10 px-8">
        Produtos Recentes:
      </Text>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={recentProducts}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <ProductsRecent
              name={item.name}
              price={Number(item.price)}
              onPress={() => handleOpenProductsDetails(item.id!)}
            />
          )}
          ListEmptyComponent={
            <Text className="text-white text-lg font-heading">
              Nenhum produto na lista
            </Text>
          }
          contentContainerStyle={
            recentProducts.length === 0
              ? { flex: 1, justifyContent: 'center', alignItems: 'center' }
              : {
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  marginHorizontal: 20,
                }
          }
          horizontal
        />
      )}
    </View>
  )
}
