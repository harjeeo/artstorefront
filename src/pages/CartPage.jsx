import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingBag01Icon } from '@hugeicons/core-free-icons';
import CartItemRow from '../components/cart/CartItemRow';
import OrderSummary from '../components/cart/OrderSummary';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    items,
    savedItems,
    updateQuantity,
    saveForLater,
    moveToCart,
    removeItem,
    itemsTotal,
    shopDiscount,
    subtotal,
    delivery,
    total,
    itemCount,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <HugeiconsIcon icon={ShoppingBag01Icon} size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-medium text-ink mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">
        Shopping Cart <span className="text-gray-400 text-xl">({itemCount})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
        {/* Left: cart items */}
        <div>
          <div className="rounded-xl border border-gray-200 px-5 sm:px-6">
            {items.map((item) => (
              <CartItemRow
                key={item.lineId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onSaveForLater={saveForLater}
                onRemove={removeItem}
              />
            ))}
          </div>

          {savedItems.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink mb-4">
                Saved for later ({savedItems.length})
              </h2>
              <div className="rounded-xl border border-gray-200 px-5 sm:px-6 divide-y divide-gray-200">
                {savedItems.map((item) => (
                  <div key={item.lineId} className="flex items-center gap-4 py-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover bg-gray-100 shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink line-clamp-1">{item.title}</p>
                      <p className="text-sm font-semibold text-ink mt-1">
                        ₹ {item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => moveToCart(item.lineId)}
                      className="shrink-0 text-sm font-semibold text-brand hover:underline cursor-pointer"
                    >
                      Move to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: order summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <OrderSummary
            itemsTotal={itemsTotal}
            shopDiscount={shopDiscount}
            subtotal={subtotal}
            delivery={delivery}
            total={total}
            itemCount={itemCount}
          />
        </div>
      </div>
    </div>
  );
}
