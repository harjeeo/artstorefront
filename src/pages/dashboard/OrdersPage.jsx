import { PackageIcon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Your Orders</h1>
      <DashboardEmptyState
        icon={PackageIcon}
        title="You haven't placed any orders yet"
        description="When you place an order, it will show up here so you can track it."
        actionLabel="Start Shopping"
        actionTo="/"
      />
    </div>
  );
}
