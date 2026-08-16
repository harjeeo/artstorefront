import { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  Tag01Icon,
  Search01Icon,
  ArrowDown01Icon,
  PencilEdit02Icon,
  ToggleOnIcon,
  ToggleOffIcon,
  Delete02Icon,
} from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';
import { initialListings } from '../../data/artistListingsData';
import type { ArtistListing } from '../../types';

const dateFilters = [
  { id: 'all', label: 'All time' },
  { id: '7', label: 'Last 7 days' },
  { id: '30', label: 'Last 30 days' },
  { id: '90', label: 'Last 90 days' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ListingsPage() {
  const [listings, setListings] = useState<ArtistListing[]>(initialListings);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  };

  const toggleStatus = (id: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: l.status === 'active' ? 'disabled' : 'active' } : l
      )
    );
    const listing = listings.find((l) => l.id === id);
    showToast(
      listing?.status === 'active' ? 'Listing disabled' : 'Listing enabled'
    );
  };

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setListings((prev) => prev.filter((l) => l.id !== id));
    showToast('Listing deleted');
  };

  const filteredListings = useMemo(() => {
    let list = listings;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((l) => l.title.toLowerCase().includes(q));
    }

    if (dateFilter !== 'all') {
      const days = Number(dateFilter);
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
      list = list.filter((l) => new Date(l.createdAt).getTime() >= cutoff);
    }

    return [...list].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [listings, search, dateFilter]);

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

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings by title..."
            className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="appearance-none rounded-full border border-gray-300 bg-white pl-4 pr-9 py-2.5 text-sm text-ink cursor-pointer hover:border-ink transition-colors focus:outline-none focus:border-ink"
          >
            {dateFilters.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {toast && (
          <span className="text-sm font-medium text-green-600 ml-auto">{toast}</span>
        )}
      </div>

      {filteredListings.length === 0 ? (
        <DashboardEmptyState
          icon={Tag01Icon}
          title={listings.length === 0 ? "You haven't listed any products yet" : 'No listings match your search'}
          description={
            listings.length === 0
              ? 'Create your first listing to start selling on Artisan.'
              : 'Try a different search term or date range.'
          }
        />
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3 whitespace-nowrap">Sr No</th>
                <th className="px-4 py-3">Artwork</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredListings.map((listing, i) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-12 w-12 rounded-lg object-cover bg-gray-100"
                      loading="lazy"
                    />
                  </td>
                  <td className="px-4 py-3 text-ink font-medium max-w-xs">
                    <span className="line-clamp-1">{listing.title}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {formatDate(listing.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        listing.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {listing.status === 'active' ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${listing.title}`}
                        onClick={() => showToast('Edit listing — coming soon')}
                        className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-ink transition-colors cursor-pointer"
                      >
                        <HugeiconsIcon icon={PencilEdit02Icon} size={17} />
                      </button>
                      <button
                        type="button"
                        aria-label={listing.status === 'active' ? `Disable ${listing.title}` : `Enable ${listing.title}`}
                        onClick={() => toggleStatus(listing.id)}
                        className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-ink transition-colors cursor-pointer"
                      >
                        <HugeiconsIcon
                          icon={listing.status === 'active' ? ToggleOnIcon : ToggleOffIcon}
                          size={19}
                        />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${listing.title}`}
                        onClick={() => handleDelete(listing.id, listing.title)}
                        className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
