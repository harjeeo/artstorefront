import { HugeiconsIcon } from '@hugeicons/react';
import {
  Wallet01Icon,
  ShoppingBag01Icon,
  ViewIcon,
  FavouriteIcon,
  AnalyticsUpIcon,
} from '@hugeicons/core-free-icons';
import StatCard from '../../components/artist-dashboard/StatCard';

export default function StatsPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Stats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Wallet01Icon} label="Revenue (30 days)" value="₹ 42,380" change="+12%" />
        <StatCard icon={ShoppingBag01Icon} label="Orders (30 days)" value="18" change="+4" />
        <StatCard icon={ViewIcon} label="Shop Views" value="1,204" change="+8%" />
        <StatCard icon={FavouriteIcon} label="Wishlisted" value="63" change="+5%" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-10 flex flex-col items-center justify-center text-center">
        <HugeiconsIcon icon={AnalyticsUpIcon} size={40} className="text-gray-300 mb-4" />
        <p className="font-medium text-ink mb-1">Detailed analytics coming soon</p>
        <p className="text-sm text-gray-500 max-w-sm">
          Sales trends, top products, and traffic sources will appear here.
        </p>
      </div>
    </div>
  );
}
