import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabs: Record<string, { icon: string; activeIcon: string }> = {
  Home: { icon: 'home-outline', activeIcon: 'home' },
  Shop: { icon: 'bag-outline', activeIcon: 'bag' },
  Routine: { icon: 'flower-outline', activeIcon: 'flower' },
  Wishlist: { icon: 'heart-outline', activeIcon: 'heart' },
  Profile: { icon: 'person-outline', activeIcon: 'person' },
};

function Placeholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderSubtitle}>{subtitle}</Text>
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
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
            onSignIn={() => navigation.navigate('Login')}
            onProductPress={(product) => navigation.navigate('Detail', { product })}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Shop">
        {() => <Placeholder title="Shop" subtitle="Temukan produk skincare favoritmu." />}
      </Tab.Screen>

      <Tab.Screen name="Routine">
        {() => <Placeholder title="Routine" subtitle="Atur rutinitas perawatan kulitmu." />}
      </Tab.Screen>

      <Tab.Screen name="Wishlist">
        {() => <Placeholder title="Wishlist" subtitle="Simpan produk favoritmu." />}
      </Tab.Screen>

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
});