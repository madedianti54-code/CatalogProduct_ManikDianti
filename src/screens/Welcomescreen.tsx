import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const handleSignIn = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUVÉRA</Text>

      <Image
        source={require('../../assets/Wajahhh.png')}
        style={styles.imageBesar}
      />

      <Image
        source={require('../../assets/sign in.png')}
        style={styles.imageKecil}
      />

      <Text style={styles.tagline}>Timeless Skincare, Pure Elegance</Text>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signIn}>Sign in</Text>
      </TouchableOpacity>
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
});