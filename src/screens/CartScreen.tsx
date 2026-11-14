import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const rupiah = (n: number) =>
  'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keranjang Saya</Text>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bag-outline" size={65} color="#455536" />
          <Text style={styles.emptyTitle}>Keranjang masih kosong</Text>
          <Text style={styles.emptyText}>
            Yuk, temukan produk skincare favoritmu!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.productInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.price}>
                    {rupiah(item.price)}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Ionicons name="remove-circle-outline" size={25} color="#455536" />
                  </TouchableOpacity>

                  <Text style={styles.quantity}>{item.quantity}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Ionicons name="add-circle-outline" size={25} color="#455536" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Ionicons name="trash-outline" size={22} color="#B65C4A" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalLabel}>Total Belanja</Text>
            <Text style={styles.total}>{rupiah(total)}</Text>

            <TouchableOpacity
              style={styles.checkout}
              onPress={() => {}}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EFE3',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#455536',
    marginBottom: 25,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33291F',
    marginTop: 15,
  },
  emptyText: {
    color: '#6B5D4F',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
  },
  productInfo: {
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#33291F',
  },
  category: {
    color: '#8A8178',
    marginTop: 4,
  },
  price: {
    color: '#455536',
    fontWeight: 'bold',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  totalLabel: {
    color: '#6B5D4F',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#455536',
    marginTop: 5,
  },
  checkout: {
    backgroundColor: '#455536',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});