import React, { useState} from 'react';
import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
TextInput,
} 
from 'react-native';


import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
const [name, setName] = useState('Nama Pengguna');
const [email, setEmail] = useState('emailpengguna@gmail.com');

const [editName, setEditName] = useState(name);
const [editEmail, setEditEmail] = useState(email);

const [isEditing, setIsEditing] = useState(false);

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
return (
  <ScrollView>

    <Text style={styles.logo}>NUVÉRA</Text>
    <Text style={styles.title}>Profil Saya</Text>

    {/* Informasi Pengguna */}
    <View style={styles.profile}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={45} color="#63866B" />
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>

  {/* Informasi Pengguna */}
  <View style={styles.profile}></View>
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
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={handleCancel}
      >
        <Text style={styles.cancelText}>Batal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  </>
) : (
  <>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={handleEdit}
    >
      <Text style={styles.buttonText}>Edit Profil</Text>
    </TouchableOpacity>
  </>
)}
  
  {/* Menu Profil */}

  <Text style={styles.heading}>Akun Saya</Text>
  <Menu icon="person-outline" title="Informasi Pribadi" />
  <Menu icon="location-outline" title="Alamat Saya" />
  <Menu icon="bag-outline" title="Pesanan Saya" />
  <Menu icon="heart-outline" title="Produk Favorit" />
  <Text style={styles.heading}>Pengaturan</Text>
  <Menu icon="notifications-outline" title="Notifikasi" />
  <Menu icon="lock-closed-outline" title="Keamanan Akun" />
  <Menu icon="help-circle-outline" title="Bantuan" />
  {/* Keluar */}
  <TouchableOpacity style={styles.logout}>
    <Ionicons name="log-out-outline" size={20} color="#B45B50" />
    <Text style={styles.logoutText}>Keluar</Text>
  </TouchableOpacity>
</ScrollView>

);
}

function Menu({ icon, title }: { icon: any; title: string }) {
return (
  <View style={styles.menu}>
    <Ionicons name={icon} size={20} color="#63866B" />
    <Text style={styles.menuText}>{title}</Text>
  </View>
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