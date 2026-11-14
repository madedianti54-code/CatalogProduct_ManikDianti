import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGES } from '../Data/images';

export type Product = { id: string; nama: string; kategori: string; harga: number; rating: number };

type Ctx = {
  favorites: Product[];
  isFav: (id: string) => boolean;
  toggleFav: (p: Product) => void;
};

const FavoritesContext = createContext<Ctx>({ favorites: [], isFav: () => false, toggleFav: () => {} });
const KEY = 'favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Muat favorit yang tersimpan
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => v && setFavorites(JSON.parse(v)))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Simpan setiap kali berubah
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  const isFav = (id: string) => favorites.some((p) => p.id === id);
  const toggleFav = (p: Product) =>
    setFavorites((f) => (f.some((x) => x.id === p.id) ? f.filter((x) => x.id !== p.id) : [...f, p]));

  return <FavoritesContext.Provider value={{ favorites, isFav, toggleFav }}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => useContext(FavoritesContext);