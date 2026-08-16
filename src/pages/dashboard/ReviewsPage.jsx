import { StarIcon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function ReviewsPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">My Reviews</h1>
      <DashboardEmptyState
        icon={StarIcon}
        title="You haven't written any reviews yet"
        description="Reviews you leave on products will appear here."
        actionLabel="View Orders"
        actionTo="/account/orders"
      />
    </div>
  );
}
