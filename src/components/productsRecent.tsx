import { Pressable, PressableProps, Text, View } from 'react-native'
import { formatCurrency } from '../utils/functions/formatCurrency'
import { ArrowRight } from 'lucide-react-native'

type Props = PressableProps & {
  name: string
  price: number
}

export function ProductsRecent({ price, name, ...rest }: Props) {
  return (
    <Pressable className="bg-zinc-700 px-4 py-7 space-y-3 rounded-md" {...rest}>
      <Text className="text-white text-2xl font-heading">
        {name.substring(0, 15) + '...'}
      </Text>
      <Text className="text-white text-lg font-body">
        {formatCurrency(price)}
      </Text>
      <View className="flex-row gap-4 justify-between">
        <Text className="text-white text-base">Ver mais detalhes</Text>
        <ArrowRight color={'white'} className="ring-0" testID="arrow-icon" />
      </View>
    </Pressable>
  )
}
