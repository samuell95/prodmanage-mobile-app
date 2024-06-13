import { Text, View } from 'react-native'
import {} from '@expo/vector-icons'
import { LogOut } from 'lucide-react-native'
import { gray } from 'tailwindcss/colors'
import { useUserStore } from '../stores/users-storage'

export function HomeHeader() {
  const { logout, userInfo } = useUserStore()
  return (
    <View className="flex-row bg-zinc-800 pt-16 pb-7 px-8 items-center">
      <View className="flex-1">
        <Text className="text-zinc-400 text-lg">Olá,</Text>
        <Text className="text-white text-base font-heading">
          {userInfo?.name}
        </Text>
      </View>

      <LogOut color={gray[200]} size={20} onPress={logout} />
    </View>
  )
}
