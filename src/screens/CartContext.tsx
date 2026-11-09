import React, { createContext, useContext, useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: any) => {
    const id = String(product.id);
    const name = product.name ?? product.nama;
    const category = product.category ?? product.kategori;
    const rawPrice = product.price ?? product.harga;
    const price =
      typeof rawPrice === 'number'
        ? rawPrice
        : Number(String(rawPrice).replace(/[^0-9]/g, ''));

    setCart((current) => {
      const existing = current.find((item) => item.id === id);

      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { id, name, category, price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }

  return context;
}