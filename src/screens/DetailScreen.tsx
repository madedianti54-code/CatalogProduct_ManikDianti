import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

export default function DetailScreen({ route, navigation }: any) {
  const { product } = route.params;
  const { addToCart } = useCart();

  const rawPrice = product.price ?? product.harga ?? 0;

  const numericPrice =
    typeof rawPrice === 'number'
      ? rawPrice
      : Number(String(rawPrice).replace(/[^\d]/g, ''));

  const productName = product.name ?? product.nama ?? 'Produk';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color="#33291F"
        />
      </TouchableOpacity>

      <View
        style={[
          styles.hero,
          { backgroundColor: product.tint ?? '#E6D9C8' },
        ]}
      >
        {product.image ? (
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <Ionicons
            name="sparkles-outline"
            size={64}
            color="#455536"
          />
        )}
      </View>

      <Text style={styles.category}>
        {product.category ?? product.kategori ?? 'Skincare'}
      </Text>

      <Text style={styles.name}>
        {productName}
      </Text>

      <Text style={styles.price}>
        Rp {numericPrice.toLocaleString('id-ID')}
      </Text>

      <Text style={styles.desc}>
        {product.description ?? product.subtitle ?? ''}
      </Text>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addToCart(product);
          Alert.alert(
            'Berhasil',
            `${productName} ditambahkan ke keranjang`
          );
        }}
      >
        <Ionicons
          name="bag-add-outline"
          size={24}
          color="#fff"
        />
        <Text style={styles.buttonText}>
          Add to Cart
        </Text>
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    height: 300,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  category: {
    fontSize: 16,
    color: '#6B5D4F',
    marginTop: 24,
  },
  name: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 32,
    color: '#33291F',
    marginTop: 6,
  },
  price: {
    fontSize: 24,
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
    borderRadius: 24,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});