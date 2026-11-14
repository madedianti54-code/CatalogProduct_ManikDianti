import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormScreen from './FormScreen';
import SettingScreen from './SettingScreen';
import ListScreen from './ListScreen';
import { getUser } from '../storage/auth';

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
  tabBorder: '#E8E4DF',
  accent: '#B5835A',
  soft: '#D5DCC8',
  danger: '#B45B50',
  dangerBg: '#F5E9E6',
};

const PHOTO_KEY = 'nuvera_photo';

type MenuName = null | 'info' | 'alamat' | 'notifikasi' | 'keamanan' | 'bantuan' | 'pesanan' | 'favorit';

const MENUS = [
  { key: 'info', icon: 'person-outline', title: 'Informasi Pribadi' },
  { key: 'alamat', icon: 'location-outline', title: 'Alamat Saya' },
  { key: 'pesanan', icon: 'cube-outline', title: 'Pesanan Saya' },
  { key: 'favorit', icon: 'heart-outline', title: 'Produk Favorit' },
  { key: 'notifikasi', icon: 'notifications-outline', title: 'Notifikasi' },
  { key: 'keamanan', icon: 'lock-closed-outline', title: 'Keamanan Akun' },
  { key: 'bantuan', icon: 'help-circle-outline', title: 'Bantuan' },
];

export default function ProfileScreen({ onLogout }: { onLogout?: () => void }) {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('Pengguna');
  const [email, setEmail] = useState('-');
  const [photo, setPhoto] = useState<string | null>(null);
  const [data, setData] = useState({ hp: '', alamat: '', kota: '', kodepos: '' });
  const [menu, setMenu] = useState<MenuName>(null);

  useEffect(() => {
    getUser().then((u) => {
      if (u) {
        setName(u.name);
        setEmail(u.email);
        setData((d) => ({ ...d, hp: u.phone }));
      }
    });

    AsyncStorage.getItem(PHOTO_KEY).then((v) => {
      if (v) setPhoto(v);
    });
  }, []);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      AsyncStorage.setItem(PHOTO_KEY, uri);
    }
  };

  const handleLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => onLogout?.() },
    ]);
  };

  if (menu === 'info') {
    return (
      <FormScreen
        title="Informasi Pribadi"
        onBack={() => setMenu(null)}
        onSave={(v: any) => {
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

  if (menu === 'alamat') {
    return (
      <FormScreen
        title="Alamat Saya"
        onBack={() => setMenu(null)}
        onSave={(v: any) =>
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

  if (menu === 'notifikasi' || menu === 'keamanan' || menu === 'bantuan') {
    return <SettingScreen type={menu} onBack={() => setMenu(null)} />;
  }

  if (menu === 'pesanan' || menu === 'favorit') {
    return <ListScreen type={menu} onBack={() => setMenu(null)} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>NUVÉRA</Text>
        <TouchableOpacity onPress={() => setMenu('notifikasi')}>
          <Ionicons name="notifications-outline" size={24} color={C.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.eyebrow}>AKUN SAYA</Text>

      <View style={styles.userRow}>
        <TouchableOpacity onPress={pickPhoto} activeOpacity={0.8}>
          <View style={styles.avatar}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarPhoto} />
            ) : (
              <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
            )}
          </View>
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={12} color={C.surface} />
          </View>
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={styles.hello}>Hello {name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => setMenu('info')}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skinCard}>
        <Ionicons name="leaf-outline" size={90} color={C.primary} style={styles.skinLeaf} />
        <Text style={styles.skinEyebrow}>MY SKIN PROFILE</Text>
        <Text style={styles.skinTitle}>Rutinitasmu, disempurnakan</Text>
        <Text style={styles.skinDesc}>
          Kami mempelajari kulitmu untuk memberi rekomendasi yang lebih baik
        </Text>
        <TouchableOpacity style={styles.skinLink} onPress={() => navigation.navigate('Routine')}>
          <Text style={styles.skinLinkText}>Lihat rutinitas</Text>
          <Ionicons name="chevron-forward" size={16} color={C.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        {MENUS.map((m) => (
          <TouchableOpacity
            key={m.key}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => setMenu(m.key as MenuName)}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={m.icon as any} size={20} color={C.primary} />
            </View>
            <Text style={styles.menuTitle}>{m.title}</Text>
            <Ionicons name="chevron-forward" size={18} color={C.textSub} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={C.danger} />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  logo: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    letterSpacing: 4,
    color: C.text,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    color: C.textSub,
    marginTop: 22,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: C.soft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPhoto: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 28,
    color: C.primary,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: C.primary,
    borderWidth: 2,
    borderColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
  },
  hello: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 24,
    color: C.text,
  },
  email: {
    fontSize: 13,
    color: C.textSub,
    marginTop: 2,
  },
  editButton: {
    borderWidth: 1,
    borderColor: C.secondary,
    backgroundColor: C.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.text,
  },
  skinCard: {
    backgroundColor: C.soft,
    borderRadius: 22,
    padding: 20,
    marginTop: 22,
    overflow: 'hidden',
  },
  skinLeaf: {
    position: 'absolute',
    right: 10,
    top: 10,
    opacity: 0.15,
  },
  skinEyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    color: C.primary,
  },
  skinTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 22,
    color: C.text,
    marginTop: 8,
  },
  skinDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: C.textSub,
    marginTop: 6,
    paddingRight: 40,
  },
  skinLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  skinLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.text,
  },
  menuList: {
    backgroundColor: C.surface,
    borderRadius: 18,
    marginTop: 22,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.tabBorder,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.dangerBg,
    padding: 15,
    borderRadius: 14,
    marginTop: 18,
    marginBottom: 40,
    gap: 8,
  },
  logoutText: {
    color: C.danger,
    fontWeight: 'bold',
  },
});