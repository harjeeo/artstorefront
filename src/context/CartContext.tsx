import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AddableProduct, CartItem } from '../types';

const DELIVERY_FEE = 199;
const ITEMS_KEY = 'artisan-cart-items';
const SAVED_KEY = 'artisan-cart-saved';

interface CartContextValue {
  items: CartItem[];
  savedItems: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    product: AddableProduct,
    options?: { size?: string; color?: string; quantity?: number }
  ) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  saveForLater: (lineId: string) => void;
  moveToCart: (lineId: string) => void;
  itemsTotal: number;
  shopDiscount: number;
  subtotal: number;
  delivery: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(key: string): CartItem[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadFromStorage(ITEMS_KEY));
  const [savedItems, setSavedItems] = useState<CartItem[]>(() => loadFromStorage(SAVED_KEY));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback<CartContextValue['addItem']>((product, options = {}) => {
    const { size = '', color = '', quantity = 1 } = options;
    const lineId = `${product.id}-${size}-${color}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        {
          lineId,
          id: product.id,
          title: product.title,
          image: product.image ?? product.images?.[0] ?? '',
          price: product.price,
          originalPrice: product.originalPrice ?? product.price,
          size,
          color,
          quantity,
          saleEndsAt: Date.now() + (5 + Math.random() * 6) * 60 * 60 * 1000,
        },
        ...prev,
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.lineId === lineId ? { ...item, quantity } : item))
    );
  }, []);

  const saveForLater = useCallback(
    (lineId: string) => {
      const item = items.find((i) => i.lineId === lineId);
      if (!item) return;
      setItems((prev) => prev.filter((i) => i.lineId !== lineId));
      setSavedItems((prev) => [item, ...prev]);
    },
    [items]
  );

  const moveToCart = useCallback(
    (lineId: string) => {
      const item = savedItems.find((i) => i.lineId === lineId);
      if (!item) return;
      setSavedItems((prev) => prev.filter((i) => i.lineId !== lineId));
      setItems((prev) => [item, ...prev]);
    },
    [savedItems]
  );

  const itemsTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shopDiscount = itemsTotal - subtotal;
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      savedItems,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      updateQuantity,
      saveForLater,
      moveToCart,
      itemsTotal,
      shopDiscount,
      subtotal,
      delivery,
      total,
      itemCount,
    }),
    [
      items,
      savedItems,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      updateQuantity,
      saveForLater,
      moveToCart,
      itemsTotal,
      shopDiscount,
      subtotal,
      delivery,
      total,
      itemCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
