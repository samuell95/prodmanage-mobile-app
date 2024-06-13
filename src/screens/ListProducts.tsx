import { Search } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { gray } from 'tailwindcss/colors'
import { Input } from '../components/input'

import { CardProducts } from '../components/cardsProduct'

import { FlatListEmpty } from '../components/flatListEmpty'

import { useProductStore } from '../stores/product-storage'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '../routes/app.routes'

export function ListProduct() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { products, fetchProducts } = useProductStore()

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(searchText.toLowerCase()),
  )

  useEffect(() => {
    fetchProducts()
  }, [products])

  return (
    <View className="flex-1 bg-zinc-900">
      <View
        className={`${isOpen ? 'px-3' : 'px-8'} flex-row bg-zinc-800 pt-16 pb-5 justify-between items-center`}
      >
        {isOpen ? (
          <View className="w-11/12 space-y-3">
            <Text className="text-white text-sm font-heading">
              Todos os produtos
            </Text>
            <Input className="bg-white">
              <Input.Field
                placeholder="Pesquisar produto"
                className="text-black"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            </Input>
          </View>
        ) : (
          <Text className="text-white text-sm font-heading">
            Todos os produtos
          </Text>
        )}
        <Search
          color={gray[400]}
          onPress={() => setIsOpen(!isOpen)}
          className={`${isOpen && 'mt-8'}`}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardProducts
            name={item.name}
            price={Number(item.price)}
            stock={Number(item.stock)}
            onPress={() =>
              navigation.navigate('details', { productId: `${item.id}` })
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingHorizontal: 10,
          marginTop: 20,
        }}
        ListEmptyComponent={<FlatListEmpty />}
      />
    </View>
  )
}
