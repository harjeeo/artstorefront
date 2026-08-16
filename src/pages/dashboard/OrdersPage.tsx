import { Link } from 'react-router-dom';
import { PackageIcon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';
import OrderStatusBadge from '../../components/dashboard/OrderStatusBadge';
import { useOrders } from '../../context/OrdersContext';
import type { Order } from '../../types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function orderTotal(order: Order) {
  const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return itemsTotal + order.shipping;
}

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <DashboardEmptyState
          icon={PackageIcon}
          title="You haven't placed any orders yet"
          description="When you place an order, it will show up here so you can track it."
          actionLabel="Start Shopping"
          actionTo="/"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-gray-200 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm font-semibold text-ink">Order {order.id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Placed on {formatDate(order.placedAt)}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="flex -space-x-3 mb-4">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-14 rounded-lg object-cover ring-2 ring-white bg-gray-100"
                    loading="lazy"
                  />
                ))}
                {order.items.length > 4 && (
                  <div className="h-14 w-14 rounded-lg ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'} &middot;{' '}
                  <span className="font-semibold text-ink">
                    ₹ {orderTotal(order).toLocaleString('en-IN')}
                  </span>
                </p>
                <Link
                  to={`/account/orders/${order.id}`}
                  className="px-5 py-2 rounded-full border border-ink text-sm font-semibold text-ink hover:bg-gray-50 transition-colors"
                >
                  View Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
