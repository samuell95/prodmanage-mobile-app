import { Text, View } from 'react-native'

type Props = {
  title?: string
  total?: number
}

export function CardsMonitoring({ title, total }: Props) {
  return (
    <View className="bg-zinc-600 p-5 rounded-md items-center  mt-6">
      <Text className="text-white text-xl font-heading">{title}</Text>
      <Text className="text-white text-3xl font-heading">{total}</Text>
    </View>
  )
}
