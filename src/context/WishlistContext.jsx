import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const WISHLIST_KEY = 'artisan-wishlist-items';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const isWishlisted = useCallback((id) => items.some((item) => item.id === id), [items]);

  const addToWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [
        {
          id: product.id,
          title: product.title,
          image: product.image ?? product.images?.[0],
          price: product.price,
          originalPrice: product.originalPrice ?? product.price,
        },
        ...prev,
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist]
  );

  const value = useMemo(
    () => ({ items, isWishlisted, addToWishlist, removeFromWishlist, toggleWishlist }),
    [items, isWishlisted, addToWishlist, removeFromWishlist, toggleWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
