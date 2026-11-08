import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormScreen from './FormScreen';

// Palet warna NUVÉRA
const C = {
  primary: '#455536',
  bg: '#F8EFE3',
  surface: '#FFFFFF',
  text: '#33291F',
  textSub: '#6B5D4F',
  placeholder: '#A89A8A',
  tabInactive: '#999999',
  secondary: '#E6D9C8',
  divider: '#CDBFAE',
  danger: '#B45B50',
  dangerBg: '#F5E9E6',
};

// Konfigurasi halaman form (key = nama field di state profile)
const FORMS: any = {
  info: {
    title: 'Informasi Pribadi',
    fields: [
      { key: 'name', label: 'Nama lengkap' },
      { key: 'email', label: 'Email', keyboardType: 'email-address' },
      { key: 'hp', label: 'Nomor HP', keyboardType: 'phone-pad' },
    ],
  },
  alamat: {
    title: 'Alamat Saya',
    fields: [
      { key: 'alamat', label: 'Alamat lengkap', multiline: true },
      { key: 'kota', label: 'Kota' },
      { key: 'kodepos', label: 'Kode pos', keyboardType: 'number-pad' },
    ],
  },
};

// Konfigurasi menu: [icon, judul, halaman tujuan?]
const MENUS: Record<string, [string, string, string?][]> = {
  'Akun Saya': [
    ['person-outline', 'Informasi Pribadi', 'info'],
    ['location-outline', 'Alamat Saya', 'alamat'],
    ['bag-outline', 'Pesanan Saya'],
    ['heart-outline', 'Produk Favorit'],
  ],
  Pengaturan: [
    ['notifications-outline', 'Notifikasi'],
    ['lock-closed-outline', 'Keamanan Akun'],
    ['help-circle-outline', 'Bantuan'],
  ],
};

export default function ProfileScreen({ onLogout }: { onLogout?: () => void }) {
  const [p, setP] = useState({
    name: 'Nama Pengguna',
    email: 'emailpengguna@gmail.com',
    hp: '', alamat: '', kota: '', kodepos: '',
  });
  const [draft, setDraft] = useState(p);
  const [isEditing, setIsEditing] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  const startEdit = () => { setDraft(p); setIsEditing(true); };
  const save = () => { setP(draft); setIsEditing(false); };

  const logout = () =>
    Alert.alert('Keluar', 'Yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => onLogout?.() },
    ]);

  if (menu) {
    const f = FORMS[menu];
    return (
      <FormScreen
        title={f.title}
        onBack={() => setMenu(null)}
        onSave={(v: any) => setP((d) => ({ ...d, ...v }))}
        fields={f.fields.map((x: any) => ({ ...x, value: (p as any)[x.key] }))}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>NUVÉRA</Text>
      <Text style={styles.title}>Profil Saya</Text>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={45} color={C.primary} />
        </View>

        {isEditing ? (
          <>
            {(['name', 'email'] as const).map((k) => (
              <View key={k} style={{ width: '100%' }}>
                <Text style={styles.label}>{k === 'name' ? 'Nama Pengguna' : 'Email'}</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={C.placeholder}
                  value={draft[k]}
                  onChangeText={(t) => setDraft({ ...draft, [k]: t })}
                  keyboardType={k === 'email' ? 'email-address' : 'default'}
                  autoCapitalize={k === 'email' ? 'none' : 'sentences'}
                />
              </View>
            ))}
            <View style={styles.row}>
              <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => setIsEditing(false)}>
                <Text style={[styles.buttonText, { color: C.textSub }]}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={save}>
                <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.email}>{p.email}</Text>
            <TouchableOpacity style={styles.button} onPress={startEdit}>
              <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {Object.entries(MENUS).map(([heading, items]) => (
        <View key={heading}>
          <Text style={styles.heading}>{heading}</Text>
          {items.map(([icon, title, target]) => (
            <TouchableOpacity key={title} style={styles.menu} onPress={() => target && setMenu(target)}>
              <Ionicons name={icon as any} size={20} color={C.primary} />
              <Text style={styles.menuText}>{title}</Text>
              <Ionicons name="chevron-forward" size={18} color={C.placeholder} />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color={C.danger} />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, padding: 22 },
  logo: { fontSize: 16, letterSpacing: 3, color: C.primary, fontWeight: 'bold', marginTop: 60 },
  title: { fontSize: 28, color: C.text, fontWeight: 'bold', marginTop: 12, marginBottom: 20 },
  profile: { backgroundColor: C.surface, borderRadius: 18, alignItems: 'center', padding: 22 },
  avatar: { width: 85, height: 85, borderRadius: 50, backgroundColor: C.secondary, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 19, fontWeight: 'bold', color: C.text, marginTop: 12 },
  email: { color: C.textSub, marginTop: 5 },
  label: { color: C.primary, fontWeight: 'bold', marginTop: 15, marginBottom: 6 },
  input: { backgroundColor: C.surface, borderWidth: 1, borderColor: C.secondary, borderRadius: 10, padding: 12, color: C.text },
  row: { flexDirection: 'row', gap: 10 },
  button: { backgroundColor: C.primary, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 20, marginTop: 18 },
  cancel: { backgroundColor: C.secondary },
  buttonText: { color: C.surface, fontWeight: 'bold' },
  heading: { fontSize: 16, fontWeight: 'bold', color: C.primary, marginTop: 25, marginBottom: 12 },
  menu: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, padding: 16, borderRadius: 12, marginBottom: 10, gap: 12 },
  menuText: { flex: 1, color: C.text, fontSize: 14 },
  logout: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: C.dangerBg, padding: 15, borderRadius: 12, marginTop: 20, marginBottom: 30, gap: 8 },
  logoutText: { color: C.danger, fontWeight: 'bold' },
});