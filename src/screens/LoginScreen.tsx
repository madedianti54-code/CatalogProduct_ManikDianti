import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUVÉRA</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A89A8A"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A89A8A"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={{ flex: 1 }} />

      <TouchableOpacity style={styles.button} onPress={() => console.log(email, password)}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8EFE3', paddingTop: 70, paddingHorizontal: 24, paddingBottom: 30 },
  title: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 30, letterSpacing: 4, color: '#33291F', textAlign: 'center' },
  subtitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 22, color: '#33291F', textAlign: 'center', marginTop: 40, marginBottom: 24 },
  input: { backgroundColor: '#fff', borderRadius: 16, padding: 16, fontSize: 16, color: '#33291F', borderWidth: 1, borderColor: '#E6D9C8', marginBottom: 14 },
  button: { backgroundColor: '#455536', borderRadius: 20, paddingVertical: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  link: { marginTop: 16, fontSize: 16, fontWeight: '700', color: '#2A1C18', textAlign: 'center' },
});