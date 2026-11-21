import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import RoutineScreen from '../screens/RoutineScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabs: Record<string, { icon: string; activeIcon: string }> = {
  Home: { icon: 'home-outline', activeIcon: 'home' },
  Shop: { icon: 'bag-outline', activeIcon: 'bag' },
  Routine: { icon: 'flower-outline', activeIcon: 'flower' },
  Wishlist: { icon: 'heart-outline', activeIcon: 'heart' },
  Cart: { icon: 'cart-outline', activeIcon: 'cart' },
  Profile: { icon: 'person-outline', activeIcon: 'person' },
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#455536',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E8E4DF',
        },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={(focused ? tabs[route.name].activeIcon : tabs[route.name].icon) as any}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <HomeScreen
            onProductPress={(product) => navigation.navigate('Detail', { product })}
            onNavigate={(tab) => navigation.navigate(tab)}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Routine" component={RoutineScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />

      <Tab.Screen name="Profile">
        {({ navigation }) => (
          <ProfileScreen onLogout={() => navigation.navigate('Welcome')} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}