import { View, Text, TouchableOpacity, Alert, StyleSheet as SS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../Data/products';
import { useCart } from '../screens/CartContext';

type Props = { item: Product; onPress: () => void };

export default function ProductCard({ item, onPress }: Props) {
  const { addToCart } = useCart();
  const { name, subtitle, rating, reviews, price, badge, icon, tint } = item;

  const add = () => {
    addToCart(item);
    Alert.alert('Berhasil', `${name} ditambahkan ke keranjang`);
  };

  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <View style={[s.thumb, { backgroundColor: tint }]}>
        <Ionicons name={icon as any} size={44} color={GREEN} />
        {!!badge && (
          <View style={s.badge}>
            <Text style={s.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={s.name}>{name}</Text>
      <Text style={s.sub}>{subtitle}</Text>
      <View style={s.row}>
        <Ionicons name="star" size={14} color="#B5835A" />
        <Text style={s.sub}>{rating} ({reviews})</Text>
      </View>
      <View style={[s.row, s.bottom]}>
        <Text style={s.price}>{price}</Text>
        <TouchableOpacity style={s.add} onPress={add}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const GREEN = '#455536';
const BROWN = '#33291F';
const GRAY = '#6B5D4F';

const s = SS.create({
  card: { width: 165, backgroundColor: '#fff', borderRadius: 18, padding: 10, marginRight: 14 },
  thumb: { height: 120, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 8, left: 8, backgroundColor: GREEN, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  name: { fontSize: 15, fontWeight: '700', color: BROWN, marginTop: 10 },
  sub: { fontSize: 12, color: GRAY, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  bottom: { justifyContent: 'space-between', marginTop: 8 },
  price: { fontSize: 14, fontWeight: '700', color: BROWN },
  add: { width: 30, height: 30, borderRadius: 15, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' },
});