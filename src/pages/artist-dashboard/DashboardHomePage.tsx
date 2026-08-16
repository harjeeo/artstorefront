import {
  Wallet01Icon,
  ShoppingBag01Icon,
  Tag01Icon,
  ViewIcon,
  PackageIcon,
} from '@hugeicons/core-free-icons';
import StatCard from '../../components/artist-dashboard/StatCard';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function DashboardHomePage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-1">
        Welcome back, Connor
      </h1>
      <p className="text-sm text-gray-500 mb-6">Here's how WonkyStitching is doing.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Wallet01Icon} label="Total Sales" value="₹ 42,380" change="+12%" />
        <StatCard icon={ShoppingBag01Icon} label="Orders" value="18" change="+4" />
        <StatCard icon={Tag01Icon} label="Active Listings" value="12" />
        <StatCard icon={ViewIcon} label="Shop Views" value="1,204" change="+8%" />
      </div>

      <h2 className="text-lg font-semibold text-ink mb-4">Recent Orders</h2>
      <DashboardEmptyState
        icon={PackageIcon}
        title="No orders yet"
        description="New orders from customers will show up here."
      />
    </div>
  );
}
