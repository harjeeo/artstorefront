import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import { MyReviewsProvider } from './context/MyReviewsContext';
import { ProductReviewsProvider } from './context/ProductReviewsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ProductReviewsPage from './pages/ProductReviewsPage';
import CartPage from './pages/CartPage';
import SearchResultsPage from './pages/SearchResultsPage';
import WishlistStorePage from './pages/WishlistPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import AboutUsPage from './pages/AboutUsPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProfilePage from './pages/dashboard/ProfilePage';
import OrdersPage from './pages/dashboard/OrdersPage';
import OrderDetailPage from './pages/dashboard/OrderDetailPage';
import WishlistPage from './pages/dashboard/WishlistPage';
import ReviewsPage from './pages/dashboard/ReviewsPage';
import AddressPage from './pages/dashboard/AddressPage';
import RequestsPage from './pages/dashboard/RequestsPage';
import ArtistSignupPage from './pages/ArtistSignupPage';
import ArtistDashboardLayout from './components/artist-dashboard/ArtistDashboardLayout';
import ArtistDashboardHomePage from './pages/artist-dashboard/DashboardHomePage';
import ArtistListingsPage from './pages/artist-dashboard/ListingsPage';
import ArtistAddListingPage from './pages/artist-dashboard/AddListingPage';
import ArtistOrdersPage from './pages/artist-dashboard/OrdersPage';
import ArtistStatsPage from './pages/artist-dashboard/StatsPage';
import ArtistPaymentsPage from './pages/artist-dashboard/PaymentsPage';
import ArtistProfilePage from './pages/artist-dashboard/ArtistProfilePage';
import ArtistSettingsPage from './pages/artist-dashboard/SettingsPage';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <MyReviewsProvider>
            <ProductReviewsProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="category/:slug" element={<CategoryPage />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="product/:id/reviews" element={<ProductReviewsPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="search" element={<SearchResultsPage />} />
                    <Route path="wishlist" element={<WishlistStorePage />} />
                    <Route path="terms-conditions" element={<TermsPage />} />
                    <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="refund-policy" element={<RefundPolicyPage />} />
                    <Route path="shipping-policy" element={<ShippingPolicyPage />} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="artist-signup" element={<ArtistSignupPage />} />
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

                  {/* Artist Dashboard — no site header/footer */}
                  <Route path="artist" element={<ArtistDashboardLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<ArtistDashboardHomePage />} />
                    <Route path="listings" element={<ArtistListingsPage />} />
                    <Route path="listings/new" element={<ArtistAddListingPage />} />
                    <Route path="orders" element={<ArtistOrdersPage />} />
                    <Route path="stats" element={<ArtistStatsPage />} />
                    <Route path="payments" element={<ArtistPaymentsPage />} />
                    <Route path="profile" element={<ArtistProfilePage />} />
                    <Route path="settings" element={<ArtistSettingsPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ProductReviewsProvider>
          </MyReviewsProvider>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
