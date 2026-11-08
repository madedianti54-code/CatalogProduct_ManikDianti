import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';

export type FormField = {
  key: string;
  label: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
};

type Props = {
  title: string;
  fields: FormField[];
  onBack: () => void;
  onSave?: (values: Record<string, string>) => void;
};

export default function FormScreen({ title, fields, onBack, onSave }: Props) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.value ?? '']))
  );

  const simpan = () => {
    onSave?.(values);
    Alert.alert('Berhasil', `${title} sudah disimpan.`, [{ text: 'OK', onPress: onBack }]);
  };

  return (
    <ScrollView style={s.page} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={onBack}>
        <Text style={s.back}>‹ Kembali</Text>
      </TouchableOpacity>
      <Text style={s.title}>{title}</Text>

      {fields.map((f) => (
        <View key={f.key} style={s.field}>
          <Text style={s.label}>{f.label}</Text>
          <TextInput
            value={values[f.key]}
            onChangeText={(t) => setValues((v) => ({ ...v, [f.key]: t }))}
            keyboardType={f.keyboardType}
            multiline={f.multiline}
            style={[s.input, f.multiline && s.multiline]}
          />
        </View>
      ))}

      <TouchableOpacity style={s.button} onPress={simpan}>
        <Text style={s.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const GREEN = '#62876A';

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FAF7F2' },
  content: { padding: 20, paddingTop: 60, paddingBottom: 60 },
  back: { color: GREEN, fontWeight: '600', fontSize: 15 },
  title: { fontSize: 30, fontWeight: '700', color: '#2D2418', marginTop: 16, marginBottom: 20 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, color: '#8A8A8A', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D2418',
  },
  multiline: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: GREEN, borderRadius: 999, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});