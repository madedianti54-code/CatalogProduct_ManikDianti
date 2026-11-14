import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesContext';

type Props = {
  type: 'pesanan' | 'favorit';
  onBack: () => void;
};

const CONTENT = {
  pesanan: {
    title: 'Pesanan Saya',
    icon: 'bag-outline' as const,
    empty: 'Belum ada pesanan',
    hint: 'Pesanan yang kamu buat akan muncul di sini.',
  },
  favorit: {
    title: 'Produk Favorit',
    icon: 'heart-outline' as const,
    empty: 'Belum ada produk favorit',
    hint: 'Produk yang kamu sukai akan muncul di sini.',
  },
} as const;

export default function ListScreen({ type, onBack }: Props) {
  const c = CONTENT[type];
  const { favorites } = useFavorites();
  const products: any[] = type === 'favorit' ? favorites : [];

  return (
    <View style={s.page}>
      <TouchableOpacity onPress={onBack}>
        <Text style={s.back}>‹ Kembali</Text>
      </TouchableOpacity>

      <Text style={s.title}>{c.title}</Text>

      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item, index) =>
            String(item.id ?? item.name ?? index)
          }
          contentContainerStyle={s.list}
          renderItem={({ item }) => {
            const price = item.price ?? item.harga;
            const priceText = price == null
              ? ''
              : `Rp${String(price).replace(/^Rp\s*/i, '')}`;

            const productImage = item.image ?? item.imageUrl ?? item.img;

            return (
              <View style={s.product}>
                {productImage ? (
                  <Image
                    source={
                      typeof productImage === 'string'
                        ? { uri: productImage }
                        : productImage
                    }
                    style={s.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={s.productIcon}>
                    <Ionicons
                      name="heart"
                      size={22}
                      color="#455536"
                    />
                  </View>
                )}

                <View style={s.productInfo}>
                  <Text style={s.productName} numberOfLines={2}>
                    {String(item.name ?? item.title ?? 'Produk Favorit')}
                  </Text>

                  {price != null && (
                    <Text style={s.price}>{priceText}</Text>
                  )}
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={s.empty}>
          <View style={s.circle}>
            <Ionicons
              name={c.icon}
              size={40}
              color="#455536"
            />
          </View>

          <Text style={s.emptyTitle}>{c.empty}</Text>
          <Text style={s.emptyHint}>{c.hint}</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8EFE3',
    padding: 22,
    paddingTop: 60,
  },
  back: {
    color: '#455536',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33291F',
    marginTop: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8EEE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33291F',
    marginTop: 18,
  },
  emptyHint: {
    color: '#999',
    marginTop: 6,
    textAlign: 'center',
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#E6D9C8',
  },
  productIcon: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#E8EEE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#33291F',
  },
  price: {
    fontSize: 13,
    color: '#6B5D4F',
    marginTop: 5,
  },
});