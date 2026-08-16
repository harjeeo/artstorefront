import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Image02Icon } from '@hugeicons/core-free-icons';
import ProductImageUploader from '../../components/artist-dashboard/ProductImageUploader';
import RichTextEditor from '../../components/artist-dashboard/RichTextEditor';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';

export default function AddListingPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    navigate('/artist/listings');
  };

  return (
    <div className="max-w-3xl">
      <Link
        to="/artist/listings"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-ink mb-4 w-fit"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Back to Listings
      </Link>

      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Add Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Product Image</label>
          <ProductImageUploader value={image} onChange={setImage} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Custom Name Embroidered Wooden Sign"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Description</label>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Describe your product — materials, sizing, how it's made..."
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Publish Listing
          </button>
          <Link
            to="/artist/listings"
            className="px-6 py-3 rounded-full border border-gray-300 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-ink mb-4">Product Previews</h2>
        <DashboardEmptyState icon={Image02Icon} title="Coming soon" />
      </div>
    </div>
  );
}
