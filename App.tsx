import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useFonts, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
type TabName = 'Home' | 'Shop' | 'Routine' | 'Wishlist' | 'Profile';

export default function App() {
  const [loaded] = useFonts({
    PlayfairDisplay_600SemiBold,
  });

  const [screen, setScreen] = useState<'welcome' | 'home'>('welcome');

  const [activeTab, setActiveTab] = useState<TabName>('Home');

  if (!loaded) return null;

  const handleGetStarted = () => {
    setScreen('home');
  };

  const handleSignIn = () => {
    console.log('Sign in ditekan');
  };

  // Halaman Welcome
  if (screen === 'welcome') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NUVÉRA</Text>

        <Image
          source={require('./assets/Wajahhh.png')}
          style={styles.imageBesar}
        />

        <Image
          source={require('./assets/sign in.png')}
          style={styles.imageKecil}
        />

        <Text style={styles.tagline}>
          Timeless Skincare Pure Elegance
        </Text>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signIn}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Konten halaman
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onSignIn={handleSignIn} />;

      case 'Shop':
        return <Placeholder title="Shop" subtitle="Temukan produk skincare favoritmu." />;

      case 'Routine':
        return <Placeholder title="Routine" subtitle="Atur rutinitas perawatan kulitmu." />;

      case 'Wishlist':
        return <Placeholder title="Wishlist" subtitle="Simpan produk favoritmu." />;

      case 'Profile':
  return <ProfileScreen />;

      default:
        return <HomeScreen onSignIn={handleSignIn} />;
    }
  };

  return (
    <View style={styles.mainContainer}>

      {/* Konten halaman */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>

        {[
          { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
          { name: 'Shop', icon: 'bag-outline', activeIcon: 'bag' },
          { name: 'Routine', icon: 'flower-outline', activeIcon: 'flower' },
          { name: 'Wishlist', icon: 'heart-outline', activeIcon: 'heart' },
          { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
        ].map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => setActiveTab(tab.name as TabName)}
            >
              <Ionicons
                name={(isActive ? tab.activeIcon : tab.icon) as any}
                size={23}
                color={isActive ? '#63866B' : '#999999'}
              />

              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.activeLabel,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  );
}

// Halaman sementara untuk tab lainnya
function Placeholder({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EFE3',
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 30,
    letterSpacing: 4,
    color: '#33291F',
  },

  imageBesar: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginTop: 20,
    resizeMode: 'cover',
  },

  imageKecil: {
    width: 160,
    height: 150,
    borderRadius: 12,
    marginTop: 20,
    resizeMode: 'cover',
  },

  tagline: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 18,
    marginTop: 24,
    textAlign: 'center',
    color: '#33291F',
  },

  spacer: {
    flex: 1,
  },

  button: {
    width: '100%',
    backgroundColor: '#455536',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  signIn: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#2A1C18',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#FAF6F2',
  },

  content: {
    flex: 1,
  },

  bottomBar: {
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E4DF',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  tabLabel: {
    fontSize: 11,
    color: '#999999',
  },

  activeLabel: {
    color: '#63866B',
    fontWeight: '700',
  },

  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF6F2',
  },

  placeholderTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 30,
    color: '#455536',
  },

  placeholderSubtitle: {
    fontSize: 14,
    color: '#888888',
    marginTop: 10,
  },
});