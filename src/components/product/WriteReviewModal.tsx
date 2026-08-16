import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, StarIcon } from '@hugeicons/core-free-icons';
import { useProductReviews } from '../../context/ProductReviewsContext';

interface WriteReviewModalProps {
  onClose: () => void;
}

export default function WriteReviewModal({ onClose }: WriteReviewModalProps) {
  const { addReview } = useProductReviews();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name.trim() || !text.trim()) return;
    addReview({ name: name.trim(), rating, text: text.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Write a review"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-ink">Write a Review</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Your rating</label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  aria-label={`${i + 1} star`}
                  className="cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={26}
                    className={i < rating ? 'text-brand fill-brand' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Your name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Your review</label>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Share your experience with this item..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-gray-300 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
