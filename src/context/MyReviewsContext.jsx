import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const MyReviewsContext = createContext(null);
const REVIEWS_KEY = 'artisan-my-reviews';

const demoReviews = [
  {
    id: 'myrev-1',
    productId: 'demo-3',
    productTitle: 'Personalized Leather Journal, Engraved Gift',
    productImage: 'https://picsum.photos/seed/order-1a/500/500',
    rating: 5,
    text: 'Beautiful quality and the engraving came out exactly how I wanted. Fast shipping too!',
    date: '2026-08-10T12:00:00.000Z',
  },
  {
    id: 'myrev-2',
    productId: 'demo-6',
    productTitle: 'Musical Wooden Ballerina Carousel Box',
    productImage: 'https://picsum.photos/seed/order-2a/500/500',
    rating: 4,
    text: 'Really lovely piece, plays a sweet tune. Packaging could have been a bit sturdier.',
    date: '2026-07-25T09:30:00.000Z',
  },
];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : demoReviews;
  } catch {
    return demoReviews;
  }
}

export function MyReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const updateReview = useCallback((id, updates) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const deleteReview = useCallback((id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value = useMemo(
    () => ({ reviews, updateReview, deleteReview }),
    [reviews, updateReview, deleteReview]
  );

  return <MyReviewsContext.Provider value={value}>{children}</MyReviewsContext.Provider>;
}

export function useMyReviews() {
  const ctx = useContext(MyReviewsContext);
  if (!ctx) throw new Error('useMyReviews must be used within a MyReviewsProvider');
  return ctx;
}
