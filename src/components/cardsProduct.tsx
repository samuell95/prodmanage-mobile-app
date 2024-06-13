import { Pressable, PressableProps, Text, View } from 'react-native'
import { formatCurrency } from '../utils/functions/formatCurrency'

type Props = PressableProps & {
  name: string
  stock: number
  price: number
}

export function CardProducts({ name, stock, price, ...rest }: Props) {
  return (
    <Pressable
      className="flex-row justify-between items-center px-5 py-2 my-2 border border-zinc-700 rounded-md"
      {...rest}
    >
      <View>
        <Text className="text-white text-lg font-heading">
          {name.substring(0, 15) + '...'}
        </Text>
        <Text className="text-zinc-500 text-xs font-body">
          {stock} em estoque
        </Text>
      </View>
      <Text className="text-white text-base font-heading">
        {formatCurrency(Number(price))}
      </Text>
    </Pressable>
  )
}
