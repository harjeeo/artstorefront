import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
          size,
          color,
          quantity,
        },
        ...prev,
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, isOpen, openCart, closeCart, addItem, removeItem, subtotal, itemCount }),
    [items, isOpen, openCart, closeCart, addItem, removeItem, subtotal, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
