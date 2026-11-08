import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { PRODUCTS, Product } from '../Data/products';

type Props = {
  onSignIn?: () => void;
  onProductPress?: (product: Product) => void;
};

export default function HomeScreen({ onSignIn, onProductPress }: Props) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>NUVÉRA</Text>
        <TouchableOpacity onPress={onSignIn}>
          <Text style={styles.link}>Masuk</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../../assets/Wajahhh.png')} style={styles.hero} />
      <Text style={styles.title}>Kulit sehat, tanpa ribet.</Text>

      <View style={styles.grid}>
        {PRODUCTS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.card}
            onPress={() => onProductPress?.(p)}
          >
            <View style={[styles.thumb, { backgroundColor: p.tint }]} />
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.price}>{p.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8EFE3',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    letterSpacing: 3,
    color: '#33291F',
  },
  link: {
    color: '#455536',
    fontWeight: '600',
  },
  hero: {
    width: '100%',
    height: 240,
    borderRadius: 24,
    marginTop: 20,
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 26,
    color: '#33291F',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
  },
  thumb: {
    aspectRatio: 1,
    borderRadius: 18,
    marginBottom: 8,
  },
  name: {
    fontWeight: '600',
    color: '#33291F',
  },
  price: {
    color: '#455536',
    marginTop: 2,
  },
});