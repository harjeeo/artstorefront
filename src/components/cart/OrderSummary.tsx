import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Shield01Icon } from '@hugeicons/core-free-icons';

interface OrderSummaryProps {
  itemsTotal: number;
  shopDiscount: number;
  subtotal: number;
  delivery: number;
  total: number;
  itemCount: number;
}

export default function OrderSummary({
  itemsTotal,
  shopDiscount,
  subtotal,
  delivery,
  total,
  itemCount,
}: OrderSummaryProps) {
  const [isGift, setIsGift] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-cream p-5 sm:p-6">
      <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
        <span>Item(s) total</span>
        <span>₹ {itemsTotal.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
        <HugeiconsIcon icon={Shield01Icon} size={18} className="shrink-0 mt-0.5" />
        <p>
          You're covered with{' '}
          <Link to="/purchase-protection" className="underline hover:text-ink">
            Artisan Purchase Protection
          </Link>
        </p>
      </div>

      {shopDiscount > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
          <span>Shop discount</span>
          <span className="text-brand font-medium">
            -₹ {shopDiscount.toLocaleString('en-IN')}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
        <span>Subtotal</span>
        <span>₹ {subtotal.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
        <span>
          Delivery
          <br />
          <span className="text-xs text-gray-500">
            (To{' '}
            <button type="button" className="underline hover:text-ink cursor-pointer">
              India, 141116
            </button>
            )
          </span>
        </span>
        <span>₹ {delivery.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex items-center justify-between border-t border-gray-300 pt-4 mb-5">
        <span className="font-semibold text-ink">
          Total ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </span>
        <span className="text-lg font-semibold text-ink">₹ {total.toLocaleString('en-IN')}</span>
      </div>

      <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={isGift}
          onChange={(e) => setIsGift(e.target.checked)}
          className="h-4.5 w-4.5 rounded border-gray-400 accent-ink cursor-pointer"
        />
        <span className="text-sm text-ink">
          Mark order as a gift &nbsp;
          <Link to="/gift-info" className="underline hover:text-brand">
            Learn more
          </Link>
        </span>
      </label>

      <button
        type="button"
        className="flex items-center justify-center w-full py-3.5 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
