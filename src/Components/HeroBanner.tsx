import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeroBanner({ onPress }: { onPress: () => void }) {
  return (
    <ImageBackground
      source={require('../../assets/fotonya.png')}
      style={styles.hero}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <Text style={styles.title}>Kulit sehat{'\n'}tanpa ribet</Text>
      <Text style={styles.sub}>Glow Starts Here</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Temukan Rutinitasmu</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  image: {
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(51,41,31,0.35)',
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 26,
    lineHeight: 32,
    color: '#F8EFE3',
  },
  sub: {
    fontSize: 13,
    color: '#F8EFE3',
    marginTop: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#455536',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 14,
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});