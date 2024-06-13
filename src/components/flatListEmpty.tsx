import { Text, View } from 'react-native'

export function FlatListEmpty() {
  return (
    <View className="bg-zinc-700 p-5 rounded-md">
      <Text className="text-white text-center text-lg font-heading">
        Desculpe, não foi possível encontrar o produto que você está procurando.
        {'\n'}A lista está vazia ou o produto não existe.
      </Text>
    </View>
  )
}
