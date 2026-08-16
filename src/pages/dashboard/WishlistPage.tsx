import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { FavouriteIcon, ShoppingCart01Icon, Delete02Icon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">
        Wishlist {items.length > 0 && <span className="text-gray-400 text-xl">({items.length})</span>}
      </h1>

      {items.length === 0 ? (
        <DashboardEmptyState
          icon={FavouriteIcon}
          title="Your wishlist is empty"
          description="Save items you love by tapping the heart icon on any product."
          actionLabel="Browse Products"
          actionTo="/"
        />
      ) : (
        <div className="rounded-xl border border-gray-200 divide-y divide-gray-200 px-5 sm:px-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 py-5">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover bg-gray-100"
                  loading="lazy"
                />
              </Link>

              <div className="flex-1 min-w-[180px]">
                <Link
                  to={`/product/${item.id}`}
                  className="text-sm font-medium text-ink hover:underline line-clamp-2"
                >
                  {item.title}
                </Link>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-sm font-semibold text-ink">
                    ₹ {item.price.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹ {item.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={ShoppingCart01Icon} size={16} />
                  Add to Cart
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${item.title} from wishlist`}
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
