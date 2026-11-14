import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesContext';
import { PRODUCTS, Product } from '../Data/products';

const C = {
  primary: '#455536',
  bg: '#F8EFE3',
  surface: '#FFFFFF',
  text: '#33291F',
  textSub: '#6B5D4F',
  placeholder: '#A89A8A',
  secondary: '#E6D9C8',
  divider: '#CDBFAE',
  accent: '#B5835A',
};

const CATEGORIES = [
  'Semua',
  'Cleanser',
  'Serum',
  'Moisturizer',
  'Sunscreen',
  'Lip Care',
  'Body Care',
  'Essence',
  'Face Oil',
  'Toner',
];

const rupiah = (value: string) => value;

export default function ShopScreen({ navigation }: { navigation?: any }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Semua');
  const { favorites, isFav, toggleFav } = useFavorites();

  const data = useMemo(
    () =>
      PRODUCTS.filter(
        (product) =>
          (cat === 'Semua' || product.category === cat) &&
          product.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search, cat]
  );

  const handleFavorite = (product: Product) => {
    toggleFav(product);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 22, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Shop</Text>
            <Text style={styles.sub}>
              Temukan produk skincare favoritmu
            </Text>
            <Text style={styles.favoriteCount}>
              Favorit: {favorites.length}
            </Text>

            <View style={styles.search}>
              <Ionicons
                name="search-outline"
                size={18}
                color={C.placeholder}
              />
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Cari produk"
                placeholderTextColor={C.placeholder}
              />
            </View>

            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 16 }}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.chip,
                    cat === item && styles.chipActive,
                  ]}
                  onPress={() => setCat(item)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      cat === item && { color: C.surface },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Produk tidak ditemukan.</Text>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation?.navigate?.('Detail', { product: item })
            }
          >
            <View
              style={[
                styles.img,
                { backgroundColor: item.tint },
              ]}
            >
              {item.image ? (
                <Image
                  source={item.image}
                  style={styles.photo}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons
                  name={item.icon as any}
                  size={36}
                  color={C.primary}
                />
              )}

              <TouchableOpacity
                style={styles.heart}
                onPress={() => handleFavorite(item)}
              >
                <Ionicons
                  name={isFav(item.id) ? 'heart' : 'heart-outline'}
                  size={18}
                  color={C.primary}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.kategori}>{item.category}</Text>

            <Text style={styles.nama} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color={C.accent} />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>

            <Text style={styles.harga}>{rupiah(item.price)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    color: C.primary,
    fontFamily: 'PlayfairDisplay_600SemiBold',
  },
  sub: {
    color: C.textSub,
    marginTop: 4,
    marginBottom: 8,
  },
  favoriteCount: {
    color: C.textSub,
    marginBottom: 14,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.secondary,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: C.text,
  },
  chip: {
    backgroundColor: C.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: C.primary,
  },
  chipText: {
    color: C.text,
    fontWeight: '600',
    fontSize: 13,
  },
  card: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },
  img: {
    height: 130,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kategori: {
    color: C.textSub,
    fontSize: 11,
    marginTop: 10,
  },
  nama: {
    color: C.text,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
    minHeight: 36,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  rating: {
    color: C.textSub,
    fontSize: 12,
  },
  harga: {
    color: C.primary,
    fontWeight: 'bold',
    marginTop: 6,
  },
  empty: {
    textAlign: 'center',
    color: C.textSub,
    marginTop: 40,
  },
});