import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShoppingCart01Icon,
  FavouriteIcon,
  UserIcon,
  Store01Icon,
  Menu01Icon,
} from '@hugeicons/core-free-icons';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';
import CategoryNav from './CategoryNav';

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold tracking-tight text-brand">Artisan</span>
          </Link>

          {/* Search - center */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
            <SearchBar />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <Link
              to="/artist-signup"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={Store01Icon} size={20} />
              Sell on Artisan
            </Link>
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={UserIcon} size={20} />
              Sign in
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={FavouriteIcon} size={22} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-brand text-white text-[10px] font-bold">
                  {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={ShoppingCart01Icon} size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-brand text-white text-[10px] font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Menu"
              className="flex md:hidden items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={Menu01Icon} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <SearchBar variant="mobile" />
        </div>
      </div>

      <CategoryNav />
    </header>
  );
}
