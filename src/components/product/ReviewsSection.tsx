import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, CheckmarkCircle01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { reviewSummaryTags, reviewCategories, reviewFilterTags } from '../../data/productDetailData';
import { useProductReviews } from '../../context/ProductReviewsContext';
import ReviewListItem from './ReviewListItem';
import WriteReviewModal from './WriteReviewModal';

const PREVIEW_COUNT = 3;

interface ReviewsSectionProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ productId, rating, reviewCount }: ReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('suggested');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const { reviews } = useProductReviews();

  return (
    <section className="mt-12 pt-10 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl font-serif font-medium text-ink">Reviews for this item</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowWriteReview(true)}
            className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Write a Review
          </button>
          <Link
            to={`/product/${productId}/reviews`}
            className="px-5 py-2.5 rounded-full border border-ink text-ink text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            View all Reviews
          </Link>
        </div>
      </div>

      <p className="text-sm font-semibold text-ink mb-2">What buyers say, summarised by AI</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
        {reviewSummaryTags.map((tag) => (
          <span key={tag} className="flex items-center gap-1.5 text-sm text-gray-700">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-green-600" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-ink">{rating.toFixed(1)}</span>
            <HugeiconsIcon icon={StarIcon} size={22} className="text-brand fill-brand" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            <span className="underline">Item average</span>
            <br />({reviewCount} reviews)
          </p>
        </div>

        {reviewCategories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full border-2 border-brand text-ink font-semibold">
              {cat.score}
            </div>
            <p className="text-xs text-gray-600 mt-2 whitespace-pre-line">{cat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
        <button
          type="button"
          onClick={() => setActiveFilter('suggested')}
          className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
            activeFilter === 'suggested'
              ? 'bg-ink text-white border-ink'
              : 'border-gray-300 text-ink hover:border-ink'
          }`}
        >
          Suggested
          <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
        </button>
        {reviewFilterTags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => setActiveFilter(tag.id)}
            className={`shrink-0 px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
              activeFilter === tag.id
                ? 'bg-ink text-white border-ink'
                : 'border-gray-300 text-ink hover:border-ink'
            }`}
          >
            {tag.label} ({tag.count})
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-200">
        {reviews.slice(0, PREVIEW_COUNT).map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </div>

      {reviews.length > PREVIEW_COUNT && (
        <Link
          to={`/product/${productId}/reviews`}
          className="inline-flex items-center justify-center mt-4 px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-ink hover:border-ink transition-colors"
        >
          View all {reviews.length} reviews
        </Link>
      )}

      {showWriteReview && <WriteReviewModal onClose={() => setShowWriteReview(false)} />}
    </section>
  );
}
