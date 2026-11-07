import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormScreen from './FormScreen';
import SettingScreen from './SettingScreen';
import ListScreen from './ListScreen';

export default function ProfileScreen({ onLogout }: { onLogout?: () => void }) {
  const [name, setName] = useState('Nama Pengguna');
  const [email, setEmail] = useState('emailpengguna@gmail.com');
  const [data, setData] = useState({ hp: '', alamat: '', kota: '', kodepos: '' });

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);

  const [menu, setMenu] = useState<null | 'info' | 'alamat' | 'notifikasi' | 'keamanan' | 'bantuan' | 'pesanan' | 'favorit'>(null);

  const handleEdit = () => {
    setEditName(name);
    setEditEmail(email);
    setIsEditing(true);
  };

  const handleSave = () => {
    setName(editName);
    setEmail(editEmail);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(name);
    setEditEmail(email);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => onLogout?.() },
    ]);
  };

  // Halaman Informasi Pribadi
  if (menu === 'info') {
    return (
      <FormScreen
        title="Informasi Pribadi"
        onBack={() => setMenu(null)}
        onSave={(v) => {
          setName(v.nama);
          setEmail(v.email);
          setData((d) => ({ ...d, hp: v.hp }));
        }}
        fields={[
          { key: 'nama', label: 'Nama lengkap', value: name },
          { key: 'email', label: 'Email', value: email, keyboardType: 'email-address' },
          { key: 'hp', label: 'Nomor HP', value: data.hp, keyboardType: 'phone-pad' },
        ]}
      />
    );
  }

  // Halaman Alamat Saya
  if (menu === 'alamat') {
    return (
      <FormScreen
        title="Alamat Saya"
        onBack={() => setMenu(null)}
        onSave={(v) =>
          setData((d) => ({ ...d, alamat: v.alamat, kota: v.kota, kodepos: v.kodepos }))
        }
        fields={[
          { key: 'alamat', label: 'Alamat lengkap', value: data.alamat, multiline: true },
          { key: 'kota', label: 'Kota', value: data.kota },
          { key: 'kodepos', label: 'Kode pos', value: data.kodepos, keyboardType: 'number-pad' },
        ]}
      />
    );
  }

  // Halaman Pengaturan
  if (menu === 'notifikasi' || menu === 'keamanan' || menu === 'bantuan') {
    return <SettingScreen type={menu} onBack={() => setMenu(null)} />;
  }

  // Halaman Pesanan & Favorit
  if (menu === 'pesanan' || menu === 'favorit') {
    return <ListScreen type={menu} onBack={() => setMenu(null)} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>NUVÉRA</Text>
      <Text style={styles.title}>Profil Saya</Text>

      {/* Kartu profil (satu saja) */}
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={45} color="#63866B" />
        </View>

        {isEditing ? (
          <>
            <Text style={styles.label}>Nama Pengguna</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Masukkan nama"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Masukkan email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>

            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Menu Profil */}
      <Text style={styles.heading}>Akun Saya</Text>
      <Menu icon="person-outline" title="Informasi Pribadi" onPress={() => setMenu('info')} />
      <Menu icon="location-outline" title="Alamat Saya" onPress={() => setMenu('alamat')} />
      <Menu icon="bag-outline" title="Pesanan Saya" onPress={() => setMenu('pesanan')} />
      <Menu icon="heart-outline" title="Produk Favorit" onPress={() => setMenu('favorit')} />

      <Text style={styles.heading}>Pengaturan</Text>
      <Menu icon="notifications-outline" title="Notifikasi" onPress={() => setMenu('notifikasi')} />
      <Menu icon="lock-closed-outline" title="Keamanan Akun" onPress={() => setMenu('keamanan')} />
      <Menu icon="help-circle-outline" title="Bantuan" onPress={() => setMenu('bantuan')} />

      {/* Keluar */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#B45B50" />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Menu({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menu} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={20} color="#63866B" />
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color="#B5B5B0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    color: '#63866B',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#FAF6F2',
    borderWidth: 1,
    borderColor: '#D8DFD4',
    borderRadius: 10,
    padding: 12,
    color: '#33291F',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  cancelButton: {
    backgroundColor: '#EAEAE5',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  cancelText: {
    color: '#555555',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF6F2',
    padding: 22,
  },
  logo: {
    fontSize: 16,
    letterSpacing: 3,
    color: '#63866B',
    fontWeight: 'bold',
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    color: '#33291F',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 20,
  },
  profile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    padding: 22,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#E8EEE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#33291F',
    marginTop: 12,
  },
  email: {
    color: '#999',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#63866B',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#63866B',
    marginTop: 25,
    marginBottom: 12,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  menuText: {
    flex: 1,
    color: '#443B33',
    fontSize: 14,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E9E6',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
    gap: 8,
  },
  logoutText: {
    color: '#B45B50',
    fontWeight: 'bold',
  },
});