import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { FavouriteIcon, ShoppingCart01Icon } from '@hugeicons/core-free-icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-1.5">Wishlist</h1>
      <p className="text-sm text-gray-500 mb-8">
        {items.length} {items.length === 1 ? 'item' : 'items'} saved
      </p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <HugeiconsIcon icon={FavouriteIcon} size={40} className="text-gray-300 mb-4" />
          <p className="font-medium text-ink mb-1">Your wishlist is empty</p>
          <p className="text-sm text-gray-500 mb-6">Save items you love by tapping the heart icon on any product.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
          {items.map((item) => (
            <div key={item.id}>
              <Link to={`/product/${item.id}`} className="group block">
                <div className="rounded-xl overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2.5">
                  <p className="text-sm text-ink line-clamp-2 leading-snug">{item.title}</p>
                  <div className="flex items-baseline gap-2 mt-1">
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
              </Link>

              <div className="flex flex-col gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-brand hover:bg-brand-dark text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={ShoppingCart01Icon} size={15} />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-ink text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={FavouriteIcon} size={15} className="text-brand fill-brand" />
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
