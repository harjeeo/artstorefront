import { ShoppingBag01Icon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Orders</h1>
      <DashboardEmptyState
        icon={ShoppingBag01Icon}
        title="No orders yet"
        description="Orders placed by customers for your listings will show up here."
      />
    </div>
  );
}
