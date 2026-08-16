import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon,
  FavouriteIcon,
  ShoppingCart01Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons';
import { sizeOptions, colorOptions } from '../../data/productDetailData';

function Select({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-ink cursor-pointer hover:border-ink transition-colors focus:outline-none focus:border-ink"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}

export default function BuyBox({ product }) {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [wishlisted, setWishlisted] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div>
      <h1 className="text-2xl sm:text-[28px] font-serif font-medium text-ink leading-snug">
        {product.title}
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        by{' '}
        <Link to={`/shop/${product.shopName}`} className="font-semibold text-ink hover:underline">
          {product.artistName}
        </Link>{' '}
        &middot;{' '}
        <Link to={`/shop/${product.shopName}`} className="text-brand hover:underline">
          {product.shopName}
        </Link>
      </p>

      <div className="flex items-center gap-1.5 mt-2">
        <div className="flex items-center text-brand">
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon key={i} icon={StarIcon} size={16} className="fill-brand" />
          ))}
        </div>
        <span className="text-sm font-medium text-ink">{product.rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
      </div>

      <div className="flex items-baseline gap-3 mt-4">
        <span className="text-2xl font-semibold text-ink">
          ₹ {product.price.toLocaleString('en-IN')}
        </span>
        <span className="text-base text-gray-400 line-through">
          ₹ {product.originalPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-sm font-semibold text-brand">{discount}% off</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Select
          label="Size"
          value={size}
          onChange={setSize}
          placeholder="Select an option"
          options={sizeOptions}
        />
        <Select
          label="Primary colour"
          value={color}
          onChange={setColor}
          placeholder="Select a colour"
          options={colorOptions.map((c) => ({ value: c.id, label: c.label }))}
        />
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={ShoppingCart01Icon} size={20} />
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          aria-pressed={wishlisted}
          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full border font-semibold text-sm transition-colors cursor-pointer ${
            wishlisted
              ? 'border-brand text-brand bg-brand/5'
              : 'border-ink text-ink hover:bg-gray-50'
          }`}
        >
          <HugeiconsIcon icon={FavouriteIcon} size={20} />
          {wishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
}
