import { FavouriteIcon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function WishlistPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Wishlist</h1>
      <DashboardEmptyState
        icon={FavouriteIcon}
        title="Your wishlist is empty"
        description="Save items you love by tapping the heart icon on any product."
        actionLabel="Browse Products"
        actionTo="/"
      />
    </div>
  );
}
