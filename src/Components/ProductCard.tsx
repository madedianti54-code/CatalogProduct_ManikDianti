import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../Data/products';
import { useCart } from '../screens/CartContext';

type Props = {
  item: Product;
  onPress: () => void;
};

const GREEN = '#455536';
const BROWN = '#33291F';
const GRAY = '#6B5D4F';

export default function ProductCard({ item, onPress }: Props) {
  const { addToCart } = useCart();
  const { name, subtitle, rating, price, badge, icon, tint, image } = item;

  const add = () => {
    addToCart(item);
    Alert.alert('Berhasil', `${name} ditambahkan ke keranjang`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.thumb, { backgroundColor: tint }]}>
        {image ? (
          <Image source={image} style={styles.photo} resizeMode="cover" />
        ) : (
          <Ionicons name={icon as any} size={44} color={GREEN} />
        )}
        {!!badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.sub}>{subtitle}</Text>

      <View style={styles.row}>
        <Ionicons name="star" size={14} color="#B5835A" />
        <Text style={styles.sub}>
          {rating}
        </Text>
      </View>

      <View style={[styles.row, styles.bottom]}>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity style={styles.add} onPress={add}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 165,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginRight: 14,
  },
  thumb: {
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: GREEN,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: BROWN,
    marginTop: 10,
  },
  sub: {
    fontSize: 12,
    color: GRAY,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  bottom: {
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: BROWN,
  },
  add: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
});