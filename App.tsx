import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import Welcomescreen from './src/screens/Welcomescreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainTabs from './src/navigation/MainTabs';
import DetailScreen from './src/screens/DetailScreen';
import { FavoritesProvider } from './src/screens/FavoritesContext';



const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({ PlayfairDisplay_600SemiBold });
  if (!loaded) return null;

  return (
  <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcomescreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </FavoritesProvider>
);
}