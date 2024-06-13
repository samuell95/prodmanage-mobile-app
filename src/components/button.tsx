import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Loading } from './loading'

type Props = TouchableOpacityProps & {
  title?: string
  isLoading?: boolean
}

export function Button({ title, isLoading, ...rest }: Props) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      className="h-12 bg-blue-500 justify-center items-center rounded-lg"
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Text className="text-white text-base font-heading">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
