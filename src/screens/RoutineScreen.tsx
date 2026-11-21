import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Palet warna NUVÉRA
const C = {
  primary: '#455536',
  bg: '#F8EFE3',
  surface: '#FFFFFF',
  text: '#33291F',
  textSub: '#6B5D4F',
  placeholder: '#A89A8A',
  secondary: '#E6D9C8',
  divider: '#CDBFAE',
  danger: '#B45B50',
};

type Step = { id: string; nama: string; produk: string; done: boolean };
type Period = 'Pagi' | 'Malam';

// Data contoh, ganti dengan data asli
const INITIAL: Record<Period, Step[]> = {
  Pagi: [
    { id: 'p1', nama: 'Cleanser', produk: 'Gentle Foam Cleanser', done: false },
    { id: 'p2', nama: 'Serum', produk: 'Vitamin C Serum', done: false },
    { id: 'p3', nama: 'Moisturizer', produk: 'Barrier Cream', done: false },
    { id: 'p4', nama: 'Sunscreen', produk: 'Daily Sunscreen SPF 50', done: false },
  ],
  Malam: [
    { id: 'm1', nama: 'Makeup remover', produk: 'Micellar Water', done: false },
    { id: 'm2', nama: 'Cleanser', produk: 'Gentle Foam Cleanser', done: false },
    { id: 'm3', nama: 'Serum', produk: 'Niacinamide Serum', done: false },
    { id: 'm4', nama: 'Moisturizer', produk: 'Barrier Cream', done: false },
  ],
};

export default function RoutineScreen() {
  const [period, setPeriod] = useState<Period>('Pagi');
  const [steps, setSteps] = useState(INITIAL);
  const [newStep, setNewStep] = useState('');

  const list = steps[period];
  const doneCount = list.filter((s) => s.done).length;
  const percent = list.length ? (doneCount / list.length) * 100 : 0;

  const update = (fn: (l: Step[]) => Step[]) => setSteps((s) => ({ ...s, [period]: fn(s[period]) }));

  const toggle = (id: string) => update((l) => l.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  const remove = (id: string) => update((l) => l.filter((s) => s.id !== id));
  const add = () => {
    const nama = newStep.trim();
    if (!nama) return;
    update((l) => [...l, { id: String(Date.now()), nama, produk: 'Produk belum dipilih', done: false }]);
    setNewStep('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Routine</Text>
      <Text style={styles.sub}>Atur rutinitas perawatan kulitmu.</Text>

      {/* Pilihan Pagi / Malam */}
      <View style={styles.segment}>
        {(['Pagi', 'Malam'] as Period[]).map((p) => (
          <TouchableOpacity key={p} style={[styles.segBtn, period === p && styles.segActive]} onPress={() => setPeriod(p)}>
            <Ionicons
              name={p === 'Pagi' ? 'sunny-outline' : 'moon-outline'}
              size={16}
              color={period === p ? C.surface : C.textSub}
            />
            <Text style={[styles.segText, period === p && { color: C.surface }]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progres */}
      <View style={styles.progressCard}>
        <Text style={styles.progressText}>
          {doneCount} dari {list.length} langkah selesai
        </Text>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${percent}%` }]} />
        </View>
      </View>

      {/* Daftar langkah */}
      {list.map((s, i) => (
        <TouchableOpacity key={s.id} style={styles.step} activeOpacity={0.8} onPress={() => toggle(s.id)}>
          <View style={styles.num}>
            <Text style={styles.numText}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.stepName, s.done && styles.done]}>{s.nama}</Text>
            <Text style={styles.stepProduct}>{s.produk}</Text>
          </View>
          <TouchableOpacity onPress={() => remove(s.id)} hitSlop={8}>
            <Ionicons name="trash-outline" size={18} color={C.danger} />
          </TouchableOpacity>
          <Ionicons
            name={s.done ? 'checkmark-circle' : 'ellipse-outline'}
            size={26}
            color={s.done ? C.primary : C.divider}
          />
        </TouchableOpacity>
      ))}

      {list.length === 0 && <Text style={styles.empty}>Belum ada langkah. Tambahkan di bawah.</Text>}

      {/* Tambah langkah */}
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={newStep}
          onChangeText={setNewStep}
          onSubmitEditing={add}
          placeholder="Tambah langkah baru"
          placeholderTextColor={C.placeholder}
        />
        <TouchableOpacity style={styles.addBtn} onPress={add}>
          <Ionicons name="add" size={24} color={C.surface} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingTop: 50 },
  title: { fontSize: 30, color: C.primary, fontFamily: 'PlayfairDisplay_600SemiBold' },
  sub: { color: C.textSub, marginTop: 4, marginBottom: 18 },
  segment: { flexDirection: 'row', backgroundColor: C.secondary, borderRadius: 14, padding: 4 },
  segBtn: { flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 11 },
  segActive: { backgroundColor: C.primary },
  segText: { color: C.textSub, fontWeight: '600' },
  progressCard: { backgroundColor: C.surface, borderRadius: 16, padding: 16, marginVertical: 16 },
  progressText: { color: C.text, fontWeight: 'bold', marginBottom: 10 },
  bar: { height: 8, borderRadius: 4, backgroundColor: C.secondary, overflow: 'hidden' },
  barFill: { height: 8, borderRadius: 4, backgroundColor: C.primary },
  step: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 14, marginBottom: 10 },
  num: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.secondary, alignItems: 'center', justifyContent: 'center' },
  numText: { color: C.primary, fontWeight: 'bold' },
  stepName: { color: C.text, fontWeight: 'bold', fontSize: 15 },
  stepProduct: { color: C.textSub, fontSize: 12, marginTop: 2 },
  done: { textDecorationLine: 'line-through', color: C.placeholder },
  empty: { textAlign: 'center', color: C.textSub, marginVertical: 20 },
  addRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  input: { flex: 1, backgroundColor: C.surface, borderWidth: 1, borderColor: C.secondary, borderRadius: 12, paddingHorizontal: 14, color: C.text },
  addBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' },
});