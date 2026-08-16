import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { useCountdown } from '../../hooks/useCountdown';

export default function CartItemRow({ item, onUpdateQuantity, onSaveForLater, onRemove }) {
  const countdown = useCountdown(item.saleEndsAt);
  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 last:border-b-0">
      <img
        src={item.image}
        alt={item.title}
        className="h-28 w-28 rounded-lg object-cover bg-gray-100 shrink-0"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${item.id}`}
            className="text-sm font-medium text-ink hover:underline line-clamp-2 leading-snug"
          >
            {item.title}
          </Link>
          {discount > 0 && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              {discount}% off
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {item.color && (
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
              Color: {item.color}
            </span>
          )}
          {item.size && (
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
              Size: {item.size}
            </span>
          )}
        </div>

        {discount > 0 && (
          <p className="text-sm text-brand font-medium mt-2">Sale ends in {countdown}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div className="relative">
            <select
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.lineId, Number(e.target.value))}
              className="appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-8 py-1.5 text-sm text-ink cursor-pointer hover:border-ink transition-colors focus:outline-none focus:border-ink"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
          <Link to={`/product/${item.id}`} className="text-sm font-semibold text-ink hover:underline">
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onSaveForLater(item.lineId)}
            className="text-sm font-semibold text-ink hover:underline cursor-pointer"
          >
            Save for later
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.lineId)}
            className="text-sm font-semibold text-ink hover:underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-base font-semibold text-ink">₹ {item.price.toLocaleString('en-IN')}</p>
        {discount > 0 && (
          <p className="text-sm text-gray-400 line-through">
            ₹ {item.originalPrice.toLocaleString('en-IN')}
          </p>
        )}
      </div>
    </div>
  );
}
