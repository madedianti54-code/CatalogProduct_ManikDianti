import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useCart } from './CartContext';

const rupiah = (n: number) =>
  'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const [qrisVisible, setQrisVisible] = useState(false);
const [orderId, setOrderId] = useState('');

const handleCheckout = () => {
  if (cart.length === 0) {
    Alert.alert('Keranjang kosong', 'Tambahkan produk dulu ya.');
    return;
  }
  setOrderId('ORD-' + Date.now());
  setQrisVisible(true);
};

const handlePaid = () => {
  setQrisVisible(false);
  clearCart();
  Alert.alert('Pembayaran berhasil', 'Terima kasih sudah berbelanja!');
};
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
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      
      <Modal visible={qrisVisible} transparent animationType="slide">
  <View style={styles.modalBg}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Bayar dengan QRIS</Text>
      <Text style={styles.modalTotal}>{rupiah(total)}</Text>

      <QRCode value={`QRIS-DEMO|${orderId}|${total}`} size={200} />

      <Text style={styles.modalNote}>
        Scan QR ini dengan aplikasi e-wallet atau mobile banking.
      </Text>

      <TouchableOpacity style={styles.checkout} onPress={handlePaid}>
        <Text style={styles.checkoutText}>Saya Sudah Bayar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setQrisVisible(false)}>
        <Text style={styles.cancelText}>Batal</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
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
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#fff', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24, alignItems: 'center', gap: 14 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#455536' },
  modalTotal: { fontSize: 22, fontWeight: '800', color: '#33291F' },
  modalNote: { fontSize: 12, color: '#6B5D4F', textAlign: 'center' },
  cancelText: { color: '#B65C4A', fontWeight: '600', marginTop: 4 },
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
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 16,
  marginBottom: 14,
  shadowColor: '#455536',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
},

  productInfo: {
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#33291F',
  },
  category: {
    fontSize: 12,
    color: '#8A8172',
    marginTop: 4,
  },
  price: {
    color: '#455536',
    fontWeight: '800',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '700',
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
    fontWeight: '800',
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