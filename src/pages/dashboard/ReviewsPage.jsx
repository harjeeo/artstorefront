import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, PencilEdit02Icon, Delete02Icon } from '@hugeicons/core-free-icons';
import DashboardEmptyState from '../../components/dashboard/DashboardEmptyState';
import { useMyReviews } from '../../context/MyReviewsContext';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          aria-label={`${i + 1} star`}
          className="cursor-pointer"
        >
          <HugeiconsIcon
            icon={StarIcon}
            size={22}
            className={i < value ? 'text-brand fill-brand' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [text, setText] = useState(review.text);

  const handleSave = () => {
    onUpdate(review.id, { rating, text });
    setEditing(false);
  };

  const handleCancel = () => {
    setRating(review.rating);
    setText(review.text);
    setEditing(false);
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="flex gap-4">
        <Link to={`/product/${review.productId}`} className="shrink-0">
          <img
            src={review.productImage}
            alt={review.productTitle}
            className="h-16 w-16 rounded-lg object-cover bg-gray-100"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to={`/product/${review.productId}`}
            className="text-sm font-medium text-ink hover:underline line-clamp-1"
          >
            {review.productTitle}
          </Link>
          <p className="text-xs text-gray-500 mt-0.5">Reviewed on {formatDate(review.date)}</p>
        </div>

        {!editing && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              aria-label="Edit review"
              onClick={() => setEditing(true)}
              className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-ink transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={17} />
            </button>
            <button
              type="button"
              aria-label="Delete review"
              onClick={() => onDelete(review.id)}
              className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Delete02Icon} size={17} />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="mt-4 space-y-3">
          <StarPicker value={rating} onChange={setRating} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-ink hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <HugeiconsIcon
                key={i}
                icon={StarIcon}
                size={15}
                className={i < review.rating ? 'text-brand fill-brand' : 'text-gray-300'}
              />
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mt-2">{review.text}</p>
        </>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  const { reviews, updateReview, deleteReview } = useMyReviews();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">My Reviews</h1>

      {reviews.length === 0 ? (
        <DashboardEmptyState
          icon={StarIcon}
          title="You haven't written any reviews yet"
          description="Reviews you leave on products will appear here."
          actionLabel="View Orders"
          actionTo="/account/orders"
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onUpdate={updateReview}
              onDelete={deleteReview}
            />
          ))}
        </div>
      )}
    </div>
  );
}
