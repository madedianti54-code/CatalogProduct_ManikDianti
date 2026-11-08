import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  selected: string | null;
  onSelect: (name: string | null) => void;
};

const CONCERNS = [
  { name: 'Hydrate', icon: 'water-outline' },
  { name: 'Brighten', icon: 'sparkles-outline' },
  { name: 'Calm', icon: 'leaf-outline' },
  { name: 'Firm', icon: 'layers-outline' },
  { name: 'Protect', icon: 'shield-checkmark-outline' },
];

export default function ConcernList({ selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {CONCERNS.map((c) => {
        const active = selected === c.name;
        return (
          <TouchableOpacity
            key={c.name}
            style={styles.item}
            onPress={() => onSelect(active ? null : c.name)}
          >
            <View style={[styles.circle, active && styles.circleActive]}>
              <Ionicons name={c.icon as any} size={24} color={active ? '#fff' : '#455536'} />
            </View>
            <Text style={styles.text}>{c.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  item: {
    alignItems: 'center',
  },
  circle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E6D9C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: '#455536',
  },
  text: {
    fontSize: 12,
    color: '#33291F',
    marginTop: 6,
  },
});