import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, StarIcon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { getProductById, reviewFilterTags } from '../data/productDetailData';
import { useProductReviews } from '../context/ProductReviewsContext';
import ReviewListItem from '../components/product/ReviewListItem';
import WriteReviewModal from '../components/product/WriteReviewModal';
import Slider from '../components/Slider';

export default function ProductReviewsPage() {
  const { id = '' } = useParams();
  const product = useMemo(() => getProductById(id), [id]);
  const { reviews } = useProductReviews();
  const [activeFilter, setActiveFilter] = useState('suggested');
  const [showWriteReview, setShowWriteReview] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to={`/product/${id}`}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-ink mb-6 w-fit"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Back to {product.title}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink">
          Hear what our customers say ({reviews.length})
        </h1>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <HugeiconsIcon
                key={i}
                icon={StarIcon}
                size={18}
                className={i < Math.round(product.rating) ? 'fill-brand' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-ink">{product.rating.toFixed(1)} out of 5</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowWriteReview(true)}
        className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors cursor-pointer mb-6"
      >
        Write a Review
      </button>

      <div className="mb-4">
        <Slider itemClassName="!gap-2 pb-1">
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
        </Slider>
      </div>

      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {reviews.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </div>

      {showWriteReview && <WriteReviewModal onClose={() => setShowWriteReview(false)} />}
    </div>
  );
}
