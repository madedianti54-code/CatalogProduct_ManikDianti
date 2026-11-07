import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="bee-flower" size={56} color="#455536" />
      <Text style={styles.title}>NUVÉRA</Text>

      <View style={styles.joinRow}>
        <Text style={styles.joinText}>Not a member? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.joinLink}>Join now</Text>
        </TouchableOpacity>
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

      <TouchableOpacity style={styles.forgotWrap}>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.button} onPress={() => console.log(email, password)}>
        <Ionicons name="log-in-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EFE3',
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
  forgotWrap: {
    alignSelf: 'flex-end',
  },
  forgot: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455536',
  },
  spacer: {
    flex: 1,
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