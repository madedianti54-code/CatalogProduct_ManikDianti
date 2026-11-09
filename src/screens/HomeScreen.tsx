import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeroBanner from '../Components/HeroBanner';
import ConcernList from '../Components/ConcernList';
import PromoBanner from '../Components/PromoBanner';
import { PRODUCTS, Product } from '../Data/products';
import ProductCard from '../Components/ProductCard';

type Props = {
  onProductPress?: (product: Product) => void;
  onNavigate?: (tab: string) => void;
};

export default function HomeScreen({ onProductPress, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [concern, setConcern] = useState<string | null>(null);

  const list = PRODUCTS.filter(
    (p) =>
      (!concern || p.concern === concern) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.logo}>NUVÉRA</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('Wishlist')}>
            <Ionicons name="heart-outline" size={22} color="#33291F" />
          </TouchableOpacity>
          <TouchableOpacity
        style={styles.iconButton}
        onPress={() => onNavigate?.('Cart')}>
      <Ionicons name="bag-outline" size={22} color="#33291F" />
</TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={20} color="#455536" />
        <TextInput
          style={styles.search}
          placeholder="Cari produk skincare..."
          placeholderTextColor="#A89A8A"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <HeroBanner onPress={() => onNavigate?.('Routine')} />
      <ConcernList selected={concern} onSelect={setConcern} />

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Terlaris</Text>
        <TouchableOpacity onPress={() => onNavigate?.('Shop')}>
          <Text style={styles.sectionLink}>Lihat Semua →</Text>
        </TouchableOpacity>
      </View>

      {list.length === 0 ? (
        <Text style={styles.empty}>Produk tidak ditemukan</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((p) => (
            <ProductCard key={p.id} item={p} onPress={() => onProductPress?.(p)} />
          ))}
        </ScrollView>
      )}

      <PromoBanner onPress={() => onNavigate?.('Routine')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8EFE3',
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 26,
    letterSpacing: 4,
    color: '#33291F',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  search: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 10,
    fontSize: 15,
    color: '#33291F',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 22,
    color: '#33291F',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#455536',
  },
  empty: {
    textAlign: 'center',
    color: '#6B5D4F',
    marginVertical: 30,
  },
});