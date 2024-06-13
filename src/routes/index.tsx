import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { View } from 'react-native'
import { AppRoutes } from './app.routes'

import { useUserStore } from '../stores/users-storage'

export function Routes() {
  const { userInfo } = useUserStore()

  return (
    <View className="flex-1 bg-zinc-900">
      <NavigationContainer>
        {userInfo?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}
