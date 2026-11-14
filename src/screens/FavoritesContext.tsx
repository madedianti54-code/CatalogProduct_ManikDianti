import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../Data/products';

type Ctx = {
  favorites: Product[];
  isFav: (id: string) => boolean;
  toggleFav: (product: Product) => void;
};

const FavoritesContext = createContext<Ctx>({
  favorites: [],
  isFav: () => false,
  toggleFav: () => {},
});

const KEY = 'favorites';

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((value) => {
        if (value) {
          const saved = JSON.parse(value);
          if (Array.isArray(saved)) {
            setFavorites(saved);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(KEY, JSON.stringify(favorites)).catch(() => {});
    }
  }, [favorites, loaded]);

  const isFav = (id: string) =>
    favorites.some((product) => product.id === id);

  const toggleFav = (product: Product) => {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFav, toggleFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);