'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { OrdersProvider } from '@/context/OrdersContext';
import { MyReviewsProvider } from '@/context/MyReviewsContext';
import { ProductReviewsProvider } from '@/context/ProductReviewsContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <MyReviewsProvider>
            <ProductReviewsProvider>{children}</ProductReviewsProvider>
          </MyReviewsProvider>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
