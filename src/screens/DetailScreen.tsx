import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailScreen({ route, navigation }: any) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#33291F" />
      </TouchableOpacity>

      <View style={[styles.hero, { backgroundColor: product.tint }]}>
        <Ionicons name="sparkles-outline" size={64} color="#455536" />
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Berhasil', product.name + ' ditambahkan ke keranjang')}
      >
        <Ionicons name="bag-add-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Add to Cart</Text>
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
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    height: 260,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  category: {
    fontSize: 14,
    color: '#6B5D4F',
    marginTop: 24,
  },
  name: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 28,
    color: '#33291F',
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#455536',
    marginTop: 8,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B5D4F',
    marginTop: 16,
  },
  spacer: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#455536',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});