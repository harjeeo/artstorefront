import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, Tag01Icon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function ListingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink">Listings</h1>
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add Listing
        </button>
      </div>

      <DashboardEmptyState
        icon={Tag01Icon}
        title="You haven't listed any products yet"
        description="Create your first listing to start selling on Artisan."
      />
    </div>
  );
}
