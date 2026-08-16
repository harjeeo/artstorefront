import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  ShoppingCart01Icon,
  FavouriteIcon,
  UserIcon,
  Store01Icon,
  Menu01Icon,
} from '@hugeicons/core-free-icons';

export default function Header() {
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
            <div className="flex w-full items-center rounded-full border-2 border-ink overflow-hidden focus-within:border-brand transition-colors">
              <input
                type="text"
                placeholder="Search for handmade products, art, gifts..."
                className="w-full px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="button"
                aria-label="Search"
                className="flex items-center justify-center h-10 w-12 bg-ink text-white hover:bg-black transition-colors cursor-pointer shrink-0"
              >
                <HugeiconsIcon icon={Search01Icon} size={20} />
              </button>
            </div>
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
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={FavouriteIcon} size={22} />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HugeiconsIcon icon={ShoppingCart01Icon} size={22} />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-brand text-white text-[10px] font-bold">
                0
              </span>
            </Link>
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
          <div className="flex w-full items-center rounded-full border-2 border-ink overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-sm outline-none"
            />
            <button
              type="button"
              aria-label="Search"
              className="flex items-center justify-center h-9 w-11 bg-ink text-white shrink-0"
            >
              <HugeiconsIcon icon={Search01Icon} size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
