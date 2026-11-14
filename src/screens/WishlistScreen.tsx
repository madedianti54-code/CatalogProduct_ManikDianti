import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IMAGES } from '../Data/images';

// Palet warna NUVÉRA
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

// Latar gambar produk (variasi krem)
const IMG_BG = ['#E6D9C8', '#D5DCC8', '#EADBC8', '#DCCFBF', '#E3D6C2', '#E8DCC4', '#DDE0CF', '#E1D3BE', '#EBDDC6'];

// Data contoh, ganti dengan data favorit asli
const INITIAL = [
  { id: '2', nama: 'Vitamin C Serum', kategori: 'Serum', harga: 149000, rating: 4.7 },
  { id: '3', nama: 'Barrier Cream', kategori: 'Moisturizer', harga: 129000, rating: 4.9 },
  { id: '4', nama: 'Daily Sunscreen SPF 50', kategori: 'Sunscreen', harga: 99000, rating: 4.6 },
];

const rupiah = (n: number) => 'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function WishlistScreen({ navigation }: { navigation?: any }) {
  const [items, setItems] = useState(INITIAL);

  const remove = (id: string) => setItems((l) => l.filter((p) => p.id !== id));

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 22, paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Wishlist</Text>
            <Text style={styles.sub}>
              {items.length > 0 ? `${items.length} produk favoritmu.` : 'Simpan produk yang kamu suka.'}
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={40} color={C.primary} />
            </View>
            <Text style={styles.emptyTitle}>Wishlist masih kosong</Text>
            <Text style={styles.emptySub}>Tekan ikon hati di produk untuk menyimpannya di sini.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate?.('Shop')}>
              <Ionicons name="bag-outline" size={18} color={C.surface} />
              <Text style={styles.buttonText}>Lihat Produk</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation?.navigate?.('Detail', { product: item })}
          >
            
            <View style={{ flex: 1 }}>
              <Text style={styles.kategori}>{item.kategori}</Text>
              <Text style={styles.nama} numberOfLines={2}>{item.nama}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color={C.accent} />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
              <Text style={styles.harga}>{rupiah(item.harga)}</Text>
            </View>
            <TouchableOpacity style={styles.heart} onPress={() => remove(item.id)} hitSlop={8}>
              <Ionicons name="heart" size={22} color={C.danger} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingTop: 50 },
  title: { fontSize: 30, color: C.primary, fontFamily: 'PlayfairDisplay_600SemiBold' },
  sub: { color: C.textSub, marginTop: 4, marginBottom: 18 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: C.surface, borderRadius: 16, padding: 12, marginBottom: 12 },
  img: { width: 84, height: 84, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  kategori: { color: C.textSub, fontSize: 11 },
  nama: { color: C.text, fontWeight: 'bold', fontSize: 15, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  rating: { color: C.textSub, fontSize: 12 },
  harga: { color: C.primary, fontWeight: 'bold', marginTop: 6 },
  heart: { alignSelf: 'flex-start', padding: 4 },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyIcon: { width: 84, height: 84, borderRadius: 42, backgroundColor: C.secondary, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { color: C.text, fontWeight: 'bold', fontSize: 17, marginTop: 16 },
  emptySub: { color: C.textSub, textAlign: 'center', marginTop: 6, paddingHorizontal: 30 },
  button: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24, marginTop: 20 },
  buttonText: { color: C.surface, fontWeight: 'bold' },
});