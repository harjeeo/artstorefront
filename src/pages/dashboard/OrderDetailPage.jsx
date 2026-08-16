import { Link, useParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Location01Icon, CreditCardIcon } from '@hugeicons/core-free-icons';
import OrderStatusBadge from '../../components/dashboard/OrderStatusBadge';
import { useOrders } from '../../context/OrdersContext';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium text-ink mb-2">Order not found</p>
        <Link to="/account/orders" className="text-sm text-brand hover:underline">
          Back to your orders
        </Link>
      </div>
    );
  }

  const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = itemsTotal + order.shipping;

  return (
    <div>
      <Link
        to="/account/orders"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-ink mb-4 w-fit"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Back to your orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink">Order {order.id}</h1>
          <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.placedAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        {/* Items */}
        <div className="rounded-xl border border-gray-200 divide-y divide-gray-200 px-5 sm:px-6">
          {order.items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="flex gap-4 py-5">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 rounded-lg object-cover bg-gray-100 shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.id}`}
                  className="text-sm font-medium text-ink hover:underline line-clamp-2"
                >
                  {item.title}
                </Link>
                {(item.size || item.color) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {[item.color, item.size].filter(Boolean).join(' / ')}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Qty {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-ink shrink-0">
                ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Summary + address + payment */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-ink mb-4">Order Summary</h2>
            <div className="space-y-2.5 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>Items total</span>
                <span>₹ {itemsTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : `₹ ${order.shipping.toLocaleString('en-IN')}`}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 mt-4 pt-4">
              <span className="font-semibold text-ink">Total</span>
              <span className="text-lg font-semibold text-ink">₹ {total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-3">
              <HugeiconsIcon icon={Location01Icon} size={18} />
              Shipping Address
            </h2>
            <p className="text-sm text-gray-700">
              {order.address.houseNo}, {order.address.addressLine1}
            </p>
            {order.address.addressLine2 && (
              <p className="text-sm text-gray-700">{order.address.addressLine2}</p>
            )}
            <p className="text-sm text-gray-700">
              {order.address.city}, {order.address.state} {order.address.pincode}, {order.address.country}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-3">
              <HugeiconsIcon icon={CreditCardIcon} size={18} />
              Payment Method
            </h2>
            <p className="text-sm text-gray-700">{order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
