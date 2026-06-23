import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

// Minimum shape needed to add or initialise a cart entry.
// Dish objects from menu.ts satisfy this via structural typing.
type CartInit = { name: string; price: number };
type CartAddable = { id: string } & CartInit;

type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;
  add: (item: CartAddable) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number, init?: CartInit) => void;
  clear: () => void;
  getQty: (id: string) => number;
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

    const add: CartContextValue['add'] = (item) => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.id === item.id);
        if (idx === -1) return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      });
    };

    const remove: CartContextValue['remove'] = (id) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const setQty: CartContextValue['setQty'] = (id, qty, init) => {
      setItems((prev) => {
        if (qty <= 0) return prev.filter((i) => i.id !== id);
        const idx = prev.findIndex((i) => i.id === id);
        if (idx === -1) {
          // Can't create a new entry without name + price
          if (!init) return prev;
          return [...prev, { id, name: init.name, price: init.price, qty }];
        }
        const next = [...prev];
        next[idx] = { ...next[idx], qty };
        return next;
      });
    };

    const clear = () => setItems([]);
    const getQty = (id: string) => items.find((i) => i.id === id)?.qty ?? 0;

    return { items, totalQty, totalPrice, add, remove, setQty, clear, getQty };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
