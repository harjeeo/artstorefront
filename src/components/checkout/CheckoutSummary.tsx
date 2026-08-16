import type { CartItem } from '../../types';

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function CheckoutSummary({ items, subtotal, shipping, total }: CheckoutSummaryProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-cream p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-ink mb-4">Order Summary</h2>

      <div className="divide-y divide-gray-200 mb-4">
        {items.map((item) => (
          <div key={item.lineId} className="flex gap-3 py-3 first:pt-0">
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 rounded-lg object-cover bg-gray-100 shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink line-clamp-1">{item.title}</p>
              {(item.size || item.color) && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {[item.color, item.size].filter(Boolean).join(' / ')}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-0.5">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold text-ink shrink-0">
              ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 pt-4 space-y-2.5">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Subtotal</span>
          <span>₹ {subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹ ${shipping.toLocaleString('en-IN')}`}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-300 mt-4 pt-4">
        <span className="text-base font-semibold text-ink">Total</span>
        <span className="text-lg font-semibold text-ink">₹ {total.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}
