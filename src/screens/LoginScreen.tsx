import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={require('../../assets/foto4.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>NUVÉRA</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

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

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => console.log('Forgot password')}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(email, password)}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.getStarted}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.link}>New here? Get Started</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#6B5949',
  },

  title: {
    position: 'absolute',
    top: 85,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 34,
    letterSpacing: 5,
    color: '#F8EFE3',
  },

  keyboard: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  card: {
    minHeight: 600,
    backgroundColor: '#F8EFE3',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    paddingHorizontal: 30,
    paddingTop: 42,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: '#D8C9B6',
  },

  heading: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 30,
    color: '#33291F',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    color: '#776858',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  input: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 25,
    fontSize: 17,
    color: '#33291F',
    borderWidth: 1.5,
    borderColor: '#E6D9C8',
    marginBottom: 18,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 30,
  },

  forgotText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#455536',
  },

  button: {
    height: 72,
    backgroundColor: '#455536',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '600',
  },

  getStarted: {
    alignItems: 'center',
    marginTop: 25,
  },

  link: {
    fontSize: 17,
    fontWeight: '600',
    color: '#33291F',
  },
});