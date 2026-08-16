import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ProductReview } from '../types';
import { reviews as seedReviews } from '../data/productDetailData';

interface ProductReviewsContextValue {
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'date' | 'avatar'>) => void;
}

const ProductReviewsContext = createContext<ProductReviewsContextValue | null>(null);
const REVIEWS_KEY = 'artisan-product-reviews';

function loadFromStorage(): ProductReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : seedReviews;
  } catch {
    return seedReviews;
  }
}

export function ProductReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<ProductReview[]>(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReview = useCallback((review: Omit<ProductReview, 'id' | 'date' | 'avatar'>) => {
    setReviews((prev) => [
      {
        id: `review-${Date.now()}`,
        avatar: null,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        ...review,
      },
      ...prev,
    ]);
  }, []);

  const value = useMemo<ProductReviewsContextValue>(
    () => ({ reviews, addReview }),
    [reviews, addReview]
  );

  return (
    <ProductReviewsContext.Provider value={value}>{children}</ProductReviewsContext.Provider>
  );
}

export function useProductReviews() {
  const ctx = useContext(ProductReviewsContext);
  if (!ctx) throw new Error('useProductReviews must be used within a ProductReviewsProvider');
  return ctx;
}
