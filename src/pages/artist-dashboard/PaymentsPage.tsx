import { Wallet01Icon, CreditCardIcon } from '@hugeicons/core-free-icons';
import StatCard from '../../components/artist-dashboard/StatCard';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Payments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatCard icon={Wallet01Icon} label="Available Balance" value="₹ 8,540" />
        <StatCard icon={CreditCardIcon} label="Pending Payout" value="₹ 2,120" />
      </div>

      <h2 className="text-lg font-semibold text-ink mb-4">Payout History</h2>
      <DashboardEmptyState
        icon={CreditCardIcon}
        title="No payouts yet"
        description="Once you make a sale, your payout history will show up here."
      />
    </div>
  );
}
