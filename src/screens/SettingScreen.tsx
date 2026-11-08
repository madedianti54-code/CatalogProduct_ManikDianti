import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  type: 'notifikasi' | 'keamanan' | 'bantuan';
  onBack: () => void;
};

const TITLES = {
  notifikasi: 'Notifikasi',
  keamanan: 'Keamanan Akun',
  bantuan: 'Bantuan',
};

const GREEN = '#63866B';

export default function SettingScreen({ type, onBack }: Props) {
  return (
    <ScrollView style={s.page} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={onBack}>
        <Text style={s.back}>‹ Kembali</Text>
      </TouchableOpacity>
      <Text style={s.title}>{TITLES[type]}</Text>

      {type === 'notifikasi' && <Notifikasi />}
      {type === 'keamanan' && <Keamanan onDone={onBack} />}
      {type === 'bantuan' && <Bantuan />}
    </ScrollView>
  );
}

/* ---------- Notifikasi ---------- */

const OPTIONS = [
  { key: 'promo', title: 'Promo & diskon', desc: 'Info penawaran terbaru' },
  { key: 'pesanan', title: 'Status pesanan', desc: 'Pembaruan pengiriman pesananmu' },
  { key: 'rutinitas', title: 'Pengingat rutinitas', desc: 'Ingatkan skincare pagi & malam' },
  { key: 'produk', title: 'Produk baru', desc: 'Kabar produk NUVÉRA terbaru' },
];

function Notifikasi() {
  const [on, setOn] = useState<Record<string, boolean>>({
    promo: true,
    pesanan: true,
    rutinitas: false,
    produk: true,
  });

  return (
    <>
      {OPTIONS.map((o) => (
        <View key={o.key} style={s.row}>
          <View style={{ flex: 1 }}>
            <Text style={s.rowTitle}>{o.title}</Text>
            <Text style={s.rowDesc}>{o.desc}</Text>
          </View>
          <Switch
            value={on[o.key]}
            onValueChange={(v) => setOn((p) => ({ ...p, [o.key]: v }))}
            trackColor={{ true: GREEN, false: '#D8DFD4' }}
            thumbColor="#fff"
          />
        </View>
      ))}
    </>
  );
}

/* ---------- Keamanan Akun ---------- */

function Keamanan({ onDone }: { onDone: () => void }) {
  const [lama, setLama] = useState('');
  const [baru, setBaru] = useState('');
  const [ulang, setUlang] = useState('');

  const simpan = () => {
    if (!lama || !baru || !ulang) return Alert.alert('Oops', 'Semua kolom harus diisi.');
    if (baru.length < 8) return Alert.alert('Oops', 'Kata sandi baru minimal 8 karakter.');
    if (baru !== ulang) return Alert.alert('Oops', 'Konfirmasi kata sandi tidak sama.');
    Alert.alert('Berhasil', 'Kata sandi berhasil diubah.', [{ text: 'OK', onPress: onDone }]);
  };

  return (
    <>
      <PasswordField label="Kata sandi lama" value={lama} onChangeText={setLama} />
      <PasswordField label="Kata sandi baru" value={baru} onChangeText={setBaru} />
      <PasswordField label="Ulangi kata sandi baru" value={ulang} onChangeText={setUlang} />

      <TouchableOpacity style={s.button} onPress={simpan}>
        <Text style={s.buttonText}>Ubah Kata Sandi</Text>
      </TouchableOpacity>
    </>
  );
}

function PasswordField({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry
        autoCapitalize="none"
        style={s.input}
      />
    </View>
  );
}

/* ---------- Bantuan ---------- */

const FAQ = [
  {
    q: 'Bagaimana cara memesan produk?',
    a: 'Buka tab Shop, pilih produk yang kamu mau, lalu ikuti langkah pemesanan.',
  },
  {
    q: 'Bagaimana mengubah alamat pengiriman?',
    a: 'Buka Profil, pilih Alamat Saya, ubah alamatnya lalu tekan Simpan.',
  },
  {
    q: 'Bagaimana cara mengubah data diri?',
    a: 'Buka Profil, pilih Informasi Pribadi, lalu perbarui data kamu.',
  },
  {
    q: 'Pesananku bermasalah, harus bagaimana?',
    a: 'Hubungi kami lewat WhatsApp atau email di bawah dan sertakan detail pesananmu.',
  },
];

// Ganti dengan kontak asli kamu
const EMAIL = 'bantuan@nuvera.com';
const WHATSAPP = '6281234567890';

function Bantuan() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Text style={s.heading}>Pertanyaan umum</Text>
      {FAQ.map((f, i) => (
        <TouchableOpacity
          key={f.q}
          style={s.faq}
          activeOpacity={0.7}
          onPress={() => setOpen(open === i ? null : i)}
        >
          <View style={s.faqHead}>
            <Text style={[s.rowTitle, { flex: 1 }]}>{f.q}</Text>
            <Ionicons name={open === i ? 'chevron-up' : 'chevron-down'} size={18} color="#B5B5B0" />
          </View>
          {open === i && <Text style={s.faqBody}>{f.a}</Text>}
        </TouchableOpacity>
      ))}

      <Text style={s.heading}>Hubungi kami</Text>
      <TouchableOpacity style={s.contact} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}>
        <Ionicons name="logo-whatsapp" size={20} color={GREEN} />
        <Text style={s.rowTitle}>WhatsApp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.contact} onPress={() => Linking.openURL(`mailto:${EMAIL}`)}>
        <Ionicons name="mail-outline" size={20} color={GREEN} />
        <Text style={s.rowTitle}>{EMAIL}</Text>
      </TouchableOpacity>
    </>
  );
}

/* ---------- Style ---------- */

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FAF6F2' },
  content: { padding: 22, paddingTop: 60, paddingBottom: 60 },
  back: { color: GREEN, fontWeight: 'bold', fontSize: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#33291F', marginTop: 16, marginBottom: 20 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  rowTitle: { color: '#33291F', fontSize: 15, fontWeight: '600' },
  rowDesc: { color: '#999', fontSize: 13, marginTop: 2 },

  label: { color: GREEN, fontWeight: 'bold', marginBottom: 6 },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D8DFD4',
    borderRadius: 10,
    padding: 12,
    color: '#33291F',
  },
  button: {
    backgroundColor: GREEN,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },

  heading: { fontSize: 16, fontWeight: 'bold', color: GREEN, marginTop: 10, marginBottom: 12 },
  faq: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 10 },
  faqHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  faqBody: { color: '#6B6259', fontSize: 14, lineHeight: 20, marginTop: 10 },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
});