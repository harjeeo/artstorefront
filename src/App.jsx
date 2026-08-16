import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import { MyReviewsProvider } from './context/MyReviewsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProfilePage from './pages/dashboard/ProfilePage';
import OrdersPage from './pages/dashboard/OrdersPage';
import OrderDetailPage from './pages/dashboard/OrderDetailPage';
import WishlistPage from './pages/dashboard/WishlistPage';
import ReviewsPage from './pages/dashboard/ReviewsPage';
import AddressPage from './pages/dashboard/AddressPage';
import RequestsPage from './pages/dashboard/RequestsPage';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <MyReviewsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="category/:slug" element={<CategoryPage />} />
                  <Route path="product/:id" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="account" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="profile" replace />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:orderId" element={<OrderDetailPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                    <Route path="address" element={<AddressPage />} />
                    <Route path="requests" element={<RequestsPage />} />
                  </Route>
                  <Route path="*" element={<ComingSoon />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </MyReviewsProvider>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
