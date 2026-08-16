import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon,
  CheckmarkCircle01Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons';
import {
  reviewSummaryTags,
  reviewCategories,
  reviewFilterTags,
  reviews,
} from '../../data/productDetailData';

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center text-brand">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={size}
          className={i < count ? 'fill-brand' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('suggested');

  return (
    <section className="mt-12 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-serif font-medium text-ink mb-4">Reviews for this item</h2>

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
        {reviews.map((review) => (
          <div key={review.id} className="py-5 flex gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Stars count={review.rating} />
                <span className="text-sm text-gray-500">{review.rating}</span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600">
                  This item
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
              {review.image && (
                <img
                  src={review.image}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover mt-3"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0 text-right">
              <div className="flex items-center gap-2">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                    {review.name[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-ink">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
