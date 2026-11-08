import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { saveUser } from '../storage/auth';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Oops', 'Lengkapi data dulu');
      return;
    }
    await saveUser({ name, email, password, phone });
    Alert.alert('Berhasil', 'Akun dibuat, silakan login');
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <MaterialCommunityIcons name="bee-flower" size={56} color="#455536" />
      <Text style={styles.title}>Welcome</Text>

      <View style={styles.joinRow}>
        <Text style={styles.joinText}>Already a member? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.joinLink}>Log in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrap}>
        <Ionicons name="person-outline" size={20} color="#455536" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#A89A8A"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputWrap}>
        <Ionicons name="mail-outline" size={20} color="#455536" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A89A8A"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputWrap}>
        <Ionicons name="lock-closed-outline" size={20} color="#455536" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A89A8A"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#A89A8A"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrap}>
        <Ionicons name="call-outline" size={20} color="#455536" />
        <Text style={styles.code}>+62</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#A89A8A"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Ionicons name="person-add-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F8EFE3',
  },
  container: {
    flexGrow: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 30,
    color: '#33291F',
    marginTop: 12,
  },
  joinRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 32,
  },
  joinText: {
    fontSize: 15,
    color: '#6B5D4F',
  },
  joinLink: {
    fontSize: 15,
    fontWeight: '700',
    color: '#455536',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6D9C8',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 12,
    fontSize: 16,
    color: '#33291F',
  },
  code: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#33291F',
  },
  spacer: {
    flex: 1,
    minHeight: 32,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#455536',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});