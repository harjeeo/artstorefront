import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AddableProduct, WishlistItem } from '../types';

interface WishlistContextValue {
  items: WishlistItem[];
  isWishlisted: (id: string) => boolean;
  addToWishlist: (product: AddableProduct) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (product: AddableProduct) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const WISHLIST_KEY = 'artisan-wishlist-items';

function loadFromStorage(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const isWishlisted = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const addToWishlist = useCallback((product: AddableProduct) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [
        {
          id: product.id,
          title: product.title,
          image: product.image ?? product.images?.[0] ?? '',
          price: product.price,
          originalPrice: product.originalPrice ?? product.price,
        },
        ...prev,
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleWishlist = useCallback(
    (product: AddableProduct) => {
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist]
  );

  const value = useMemo<WishlistContextValue>(
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
