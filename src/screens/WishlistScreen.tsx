import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesContext';

const C = {
  primary: '#455536',
  bg: '#F8EFE3',
  surface: '#FFFFFF',
  text: '#33291F',
  textSub: '#6B5D4F',
  secondary: '#E6D9C8',
  accent: '#B5835A',
  danger: '#B45B50',
};

const CATEGORIES = [
  'Semua',
  'Serum',
  'Moisturizer',
  'Sunscreen',
  'Lip Care',
  'Body Care',
  'Essence',
  'Cleanser',
  'Face Oil',
  'Toner',
];

export default function WishlistScreen({
  navigation,
}: {
  navigation?: any;
}) {
  const { favorites, toggleFav } = useFavorites();
  const [filter, setFilter] = useState('Semua');

  const items =
    filter === 'Semua'
      ? favorites
      : favorites.filter((p) => p.category === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSide} />

        <Text style={styles.logo}>NUVÉRA</Text>

        <TouchableOpacity
          style={styles.headerSide}
          onPress={() => navigation?.navigate?.('Cart')}
        >
          <Ionicons name="bag-outline" size={24} color={C.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.topRow}>
              <Text style={styles.eyebrow}>KOLEKSIMU</Text>
              <Text style={styles.eyebrow}>
                {favorites.length} ITEM
              </Text>
            </View>

            <Text style={styles.title}>Wishlist</Text>

            <Text style={styles.subtitle}>
              Kecantikan dimulai dari pilihanmu
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipRow}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.chip,
                    filter === category && styles.chipActive,
                  ]}
                  onPress={() => setFilter(category)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      filter === category && styles.chipTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="heart-outline"
                size={40}
                color={C.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>
              {favorites.length === 0
                ? 'Wishlist masih kosong'
                : 'Produk tidak ditemukan'}
            </Text>

            <Text style={styles.emptySub}>
              {favorites.length === 0
                ? 'Tekan ikon hati di produk untuk menyimpannya di sini.'
                : 'Belum ada produk dalam kategori ini.'}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation?.navigate?.('Shop')}
            >
              <Text style={styles.buttonText}>Lihat Produk</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation?.navigate?.('Detail', { product: item })
            }
          >
            <View style={[styles.imageWrap, { backgroundColor: item.tint }]}>
              {item.image ? (
                <Image
                  source={item.image}
                  style={styles.photo}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons
                  name={item.icon as any}
                  size={40}
                  color={C.primary}
                />
              )}

              <TouchableOpacity
                style={styles.heart}
                onPress={() => toggleFav(item)}
                hitSlop={8}
              >
                <Ionicons
                  name="heart"
                  size={18}
                  color={C.danger}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.info}>
              <Text style={styles.kategori}>
                <Text>{(item.category || 'Skincare').toUpperCase()}</Text>
              </Text>

              <Text style={styles.nama} numberOfLines={2}>
                {item.name}
              </Text>

              <View style={styles.ratingRow}>
                <Ionicons
                  name="star"
                  size={13}
                  color={C.accent}
                />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>

              <Text style={styles.harga}>{item.price}</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#CDBFAE',
  },
  headerSide: {
    width: 28,
    alignItems: 'flex-end',
  },
  logo: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    letterSpacing: 4,
    color: C.text,
  },
  content: {
    padding: 22,
    paddingBottom: 40,
    flexGrow: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    color: C.accent,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 38,
    color: C.text,
    marginTop: 10,
  },
  subtitle: {
    fontStyle: 'italic',
    color: C.textSub,
    marginTop: 6,
  },
  chipRow: {
    marginTop: 18,
    marginBottom: 18,
    flexGrow: 0,
  },
  chip: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  chipText: {
    color: C.text,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: C.surface,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
  },
  imageWrap: {
    width: 112,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
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
  info: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  kategori: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: C.accent,
  },
  nama: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 17,
    color: C.text,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  rating: {
    color: C.textSub,
    fontSize: 12,
  },
  harga: {
    color: C.primary,
    fontWeight: 'bold',
    marginTop: 8,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: C.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: C.text,
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 16,
  },
  emptySub: {
    color: C.textSub,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: C.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  buttonText: {
    color: C.surface,
    fontWeight: 'bold',
  },
});