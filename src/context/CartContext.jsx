import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const DELIVERY_FEE = 199;
const ITEMS_KEY = 'artisan-cart-items';
const SAVED_KEY = 'artisan-cart-saved';

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadFromStorage(ITEMS_KEY));
  const [savedItems, setSavedItems] = useState(() => loadFromStorage(SAVED_KEY));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product, options = {}) => {
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
          image: product.image ?? product.images?.[0],
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

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.lineId === lineId ? { ...item, quantity } : item))
    );
  }, []);

  const saveForLater = useCallback(
    (lineId) => {
      const item = items.find((i) => i.lineId === lineId);
      if (!item) return;
      setItems((prev) => prev.filter((i) => i.lineId !== lineId));
      setSavedItems((prev) => [item, ...prev]);
    },
    [items]
  );

  const moveToCart = useCallback(
    (lineId) => {
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

  const value = useMemo(
    () => ({
      items,
      savedItems,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
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
