import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Serum Cahaya', price: 'Rp 189.000', tint: '#EBCFC8' },
  { id: '2', name: 'Krim Malam', price: 'Rp 245.000', tint: '#D9D2E3' },
  { id: '3', name: 'Lip Tint Mawar', price: 'Rp 99.000', tint: '#E8B8B4' },
  { id: '4', name: 'Body Butter', price: 'Rp 135.000', tint: '#E9DDC9' },
];

export default function HomeScreen({ onSignIn }: { onSignIn?: () => void }) {
  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <View style={s.header}>
        <Text style={s.logo}>NUVÉRA</Text>
        <TouchableOpacity onPress={onSignIn}>
          <Text style={s.link}>Masuk</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('./assets/Wajahhh.png')} style={s.hero} />
      <Text style={s.title}>Kulit sehat, tanpa ribet.</Text>

      <View style={s.grid}>
        {PRODUCTS.map((p) => (
          <View key={p.id} style={s.card}>
            <View style={[s.thumb, { backgroundColor: p.tint }]} />
            <Text style={s.name}>{p.name}</Text>
            <Text style={s.price}>{p.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FAF6F2' },
  content: { padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 24, letterSpacing: 3, color: '#2A1F2D' },
  link: { color: '#B5656B', fontWeight: '600' },
  hero: { width: '100%', height: 240, borderRadius: 24, marginTop: 20 },
  title: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 26, color: '#2A1F2D', marginVertical: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { width: '47%' },
  thumb: { aspectRatio: 1, borderRadius: 18, marginBottom: 8 },
  name: { fontWeight: '600', color: '#2A1F2D' },
  price: { color: '#B5656B', marginTop: 2 },
})