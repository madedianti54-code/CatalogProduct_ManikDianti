import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  type: 'pesanan' | 'favorit';
  onBack: () => void;
};

const CONTENT = {
  pesanan: {
    title: 'Pesanan Saya',
    icon: 'bag-outline',
    empty: 'Belum ada pesanan',
    hint: 'Pesanan yang kamu buat akan muncul di sini.',
  },
  favorit: {
    title: 'Produk Favorit',
    icon: 'heart-outline',
    empty: 'Belum ada produk favorit',
    hint: 'Produk yang kamu sukai akan muncul di sini.',
  },
} as const;

export default function ListScreen({ type, onBack }: Props) {
  const c = CONTENT[type];

  return (
    <View style={s.page}>
      <TouchableOpacity onPress={onBack}>
        <Text style={s.back}>‹ Kembali</Text>
      </TouchableOpacity>
      <Text style={s.title}>{c.title}</Text>

      <View style={s.empty}>
        <View style={s.circle}>
          <Ionicons name={c.icon} size={40} color="#63866B" />
        </View>
        <Text style={s.emptyTitle}>{c.empty}</Text>
        <Text style={s.emptyHint}>{c.hint}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FAF6F2', padding: 22, paddingTop: 60 },
  back: { color: '#63866B', fontWeight: 'bold', fontSize: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#33291F', marginTop: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 120 },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8EEE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#33291F', marginTop: 18 },
  emptyHint: { color: '#999', marginTop: 6, textAlign: 'center' },
});