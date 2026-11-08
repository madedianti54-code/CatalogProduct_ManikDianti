import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../data/products';

type Props = {
  item: Product;
  onPress: () => void;
};

export default function ProductCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.thumb, { backgroundColor: item.tint }]}>
        <Ionicons name={item.icon as any} size={44} color="#455536" />
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#B5835A" />
        <Text style={styles.ratingText}>
          {item.rating} ({item.reviews})
        </Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Berhasil', item.name + ' ditambahkan ke keranjang')}
        >
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#455536',
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
    color: '#33291F',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B5D4F',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B5D4F',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#33291F',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#455536',
    alignItems: 'center',
    justifyContent: 'center',
  },
});