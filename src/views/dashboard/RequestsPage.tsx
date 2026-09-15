import { InboxIcon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function RequestsPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Requests</h1>
      <DashboardEmptyState
        icon={InboxIcon}
        title="No requests yet"
        description="Custom order requests you send to artists will show up here."
      />
    </div>
  );
}
