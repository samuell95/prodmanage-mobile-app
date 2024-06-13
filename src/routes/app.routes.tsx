import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Home } from '../screens/Home'
import { EditProduct } from '../screens/EditProduct'
import { ListProduct } from '../screens/ListProducts'
import { NewProduct } from '../screens/NewProduct'
import { ClipboardList, HomeIcon, PackagePlus } from 'lucide-react-native'
import { blue, gray } from 'tailwindcss/colors'
import { Platform } from 'react-native'
import { DetailsProduct } from '../screens/DetailsProduct'

type AppRoutes = {
  home: undefined
  edit: { productId: string }
  list: undefined
  new: undefined
  details: { productId: string }
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: blue[600],
        tabBarInactiveTintColor: gray[400],
        tabBarStyle: {
          backgroundColor: gray[800],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: 25,
          paddingTop: 30,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} testID="home-tab" />
          ),
        }}
      />
      <Screen
        name="new"
        component={NewProduct}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PackagePlus size={size} color={color} testID="new-product-tab" />
          ),
        }}
      />
      <Screen
        name="list"
        component={ListProduct}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="edit"
        component={EditProduct}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="details"
        component={DetailsProduct}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}
