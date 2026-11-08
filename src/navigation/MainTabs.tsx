import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopScreen from '../screens/ShopScreen';
import RoutineScreen from '../screens/RoutineScreen';
import WishlistScreen from '../screens/WishlistScreen';


const Tab = createBottomTabNavigator();

const tabs: Record<string, { icon: string; activeIcon: string }> = {
  Home: { icon: 'home-outline', activeIcon: 'home' },
  Shop: { icon: 'bag-outline', activeIcon: 'bag' },
  Routine: { icon: 'flower-outline', activeIcon: 'flower' },
  Wishlist: { icon: 'heart-outline', activeIcon: 'heart' },
  Profile: { icon: 'person-outline', activeIcon: 'person' },
};

type PlaceholderProps = {
  title: string;
  subtitle: string;
  onBack: () => void;
};

function Placeholder({ title, subtitle, onBack }: PlaceholderProps) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderSubtitle}>{subtitle}</Text>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="home-outline" size={20} color="#fff" />
        <Text style={styles.backText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
}

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

      <Tab.Screen name="Profile">
        {({ navigation }) => (
          <ProfileScreen onLogout={() => navigation.navigate('Welcome')} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8EFE3',
  },
  placeholderTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 30,
    color: '#455536',
  },
  placeholderSubtitle: {
    fontSize: 14,
    color: '#6B5D4F',
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#455536',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 28,
    gap: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});