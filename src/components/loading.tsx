import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <ActivityIndicator testID="loading-component" />
    </View>
  )
}
