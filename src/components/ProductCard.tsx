import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { FavouriteIcon, StarIcon } from '@hugeicons/core-free-icons';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className = 'snap-start shrink-0 w-44 sm:w-52',
}: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <Link to={`/product/${product.id}`} className={`group ${className}`}>
      <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          type="button"
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 flex items-center justify-center h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm cursor-pointer"
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={16}
            className={wishlisted ? 'text-brand fill-brand' : 'text-ink'}
          />
        </button>
        {product.bestseller && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white text-[11px] font-semibold text-ink shadow-sm">
            Bestseller
          </span>
        )}
      </div>
      <div className="mt-2.5">
        <p className="text-sm text-ink line-clamp-2 leading-snug">{product.title}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
          <HugeiconsIcon icon={StarIcon} size={13} className="text-brand fill-brand" />
          <span>{product.rating}</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-semibold text-ink">₹ {product.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-gray-400 line-through">
            ₹ {product.originalPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </Link>
  );
}
