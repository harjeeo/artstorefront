import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, Delete02Icon, ShoppingBag01Icon } from '@hugeicons/core-free-icons';
import { useCart } from '../context/CartContext';

const DRAWER_TRANSITION =
  'transform .6s cubic-bezier(.75, 0, .175, 1), visibility .6s cubic-bezier(.75, 0, .175, 1)';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeCart]);

  return (
    <div className="fixed inset-0 z-[60]" aria-hidden={!isOpen} style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity .6s cubic-bezier(.75, 0, .175, 1), visibility .6s cubic-bezier(.75, 0, .175, 1)',
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: DRAWER_TRANSITION,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-semibold text-ink">
            Your Cart {items.length > 0 && <span className="text-gray-400 font-normal">({items.length})</span>}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-gray-500">
              <HugeiconsIcon icon={ShoppingBag01Icon} size={40} className="text-gray-300" />
              <p className="font-medium text-ink">Your cart is empty</p>
              <p className="text-sm">Add items to get started.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.lineId} className="flex gap-3 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-lg object-cover bg-gray-100 shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {[item.size, item.color].filter(Boolean).join(' / ')}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-ink">
                        ₹ {item.price.toLocaleString('en-IN')} &times; {item.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => removeItem(item.lineId)}
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer shrink-0"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 shrink-0">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-ink text-base">
                ₹ {subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex gap-3">
              <Link
                to="/cart"
                onClick={closeCart}
                className="flex-1 flex items-center justify-center py-3 rounded-full border border-ink text-ink font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Go to Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="flex-1 flex items-center justify-center py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
