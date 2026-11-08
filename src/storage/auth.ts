import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'nuvera_user';

export async function saveUser(user: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) {
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
}

export async function getUser() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}