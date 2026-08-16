import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  FavouriteIcon,
  PlayIcon,
  RulerIcon,
  Table01Icon,
} from '@hugeicons/core-free-icons';
import { colorOptions } from '../../data/productDetailData';
import { useWishlist } from '../../context/WishlistContext';

function ThumbContent({ thumb }) {
  if (thumb.type === 'video') {
    return (
      <>
        <img src={thumb.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <HugeiconsIcon icon={PlayIcon} size={20} className="text-white" />
        </div>
      </>
    );
  }
  if (thumb.type === 'swatches') {
    return (
      <div className="h-full w-full grid grid-cols-3 gap-0.5 p-1.5 bg-white">
        {colorOptions.concat(colorOptions).slice(0, 9).map((c, i) => (
          <span
            key={`${c.id}-${i}`}
            className="rounded-full border border-gray-200"
            style={{ backgroundColor: swatchHex(c.id) }}
          />
        ))}
      </div>
    );
  }
  if (thumb.type === 'chart') {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-50">
        <HugeiconsIcon icon={Table01Icon} size={28} className="text-gray-400" />
      </div>
    );
  }
  return <img src={thumb.src} alt="" className="h-full w-full object-cover" loading="lazy" />;
}

function swatchHex(id) {
  return (
    {
      natural: '#e9e2d3',
      'sky-blue': '#a9c9e6',
      black: '#111111',
      white: '#ffffff',
      sage: '#9caf8c',
    }[id] || '#cccccc'
  );
}

export default function ImageGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const thumbs = product.thumbnails;
  const active = thumbs[activeIndex];

  const goTo = (dir) => {
    setActiveIndex((i) => (i + dir + thumbs.length) % thumbs.length);
  };

  return (
    <div className="flex gap-3">
      {/* Thumbnails rail */}
      <div className="hidden sm:flex flex-col gap-2 w-[76px] shrink-0 max-h-[600px] overflow-y-auto no-scrollbar">
        {thumbs.map((thumb, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`relative h-[76px] w-[76px] rounded-lg overflow-hidden border shrink-0 cursor-pointer transition-all ${
              i === activeIndex ? 'ring-2 ring-ink border-transparent' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <ThumbContent thumb={thumb} />
          </button>
        ))}
      </div>

      {/* Main viewer */}
      <div className="relative flex-1 min-w-0">
        <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
          {active.type === 'video' ? (
            <img src={active.poster} alt="" className="h-full w-full object-cover" />
          ) : active.type === 'swatches' || active.type === 'chart' ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
              <HugeiconsIcon
                icon={active.type === 'chart' ? Table01Icon : RulerIcon}
                size={64}
                className="text-gray-300"
              />
            </div>
          ) : (
            <img src={active.src} alt={product.title} className="h-full w-full object-cover" />
          )}

          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          className="absolute -top-3 -right-3 flex items-center justify-center h-11 w-11 rounded-full bg-white shadow-md border border-gray-100 hover:scale-105 transition-transform cursor-pointer"
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={20}
            className={wishlisted ? 'text-brand' : 'text-ink'}
          />
        </button>
      </div>
    </div>
  );
}
