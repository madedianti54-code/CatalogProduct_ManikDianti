import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PromoBanner({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.promo}>
      <Text style={styles.title}>Bangun rutinitas sempurnamu</Text>
      <Text style={styles.sub}>Temukan produk yang cocok untuk kulitmu.</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Coba Kuis Kulit →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  promo: {
    backgroundColor: '#455536',
    borderRadius: 20,
    padding: 20,
    marginTop: 22,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#F8EFE3',
  },
  sub: {
    fontSize: 13,
    color: '#F8EFE3',
    marginTop: 4,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8EFE3',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 14,
  },
  buttonText: {
    color: '#455536',
    fontSize: 13,
    fontWeight: '700',
  },
});