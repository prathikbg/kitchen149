import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type CartItem = {
  name: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;
  add: (name: string, price: number) => void;
  remove: (name: string) => void;
  setQty: (name: string, qty: number, price?: number) => void;
  clear: () => void;
  getQty: (name: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

// Parses prices like "₹199" -> 199
export function parsePrice(p: string): number {
  const m = p.replace(/[^\d.]/g, '');
  return m ? parseInt(m, 10) : 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const totalQty = items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = items.reduce((s, i) => s + i.qty * i.price, 0);

    const add: CartContextValue['add'] = (name, price) => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.name === name);
        if (idx === -1) return [...prev, { name, price, qty: 1 }];
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      });
    };

    const remove: CartContextValue['remove'] = (name) => {
      setItems((prev) => prev.filter((i) => i.name !== name));
    };

    const setQty: CartContextValue['setQty'] = (name, qty, price) => {
      setItems((prev) => {
        if (qty <= 0) return prev.filter((i) => i.name !== name);
        const idx = prev.findIndex((i) => i.name === name);
        if (idx === -1) {
          return [...prev, { name, price: price ?? 0, qty }];
        }
        const next = [...prev];
        next[idx] = { ...next[idx], qty };
        return next;
      });
    };

    const clear = () => setItems([]);
    const getQty = (name: string) => items.find((i) => i.name === name)?.qty ?? 0;

    return { items, totalQty, totalPrice, add, remove, setQty, clear, getQty };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
