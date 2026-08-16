import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import type { ProductReview } from '../../types';

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

export default function ReviewListItem({ review }: { review: ProductReview }) {
  return (
    <div className="py-5">
      <div className="flex items-center gap-2 mb-1.5">
        <Stars count={review.rating} />
        <span className="text-sm text-gray-500">{review.rating}</span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-xs font-medium text-green-700">
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={13} />
          Verified Buyer
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

      <div className="flex items-center gap-2.5 mt-4">
        {review.avatar ? (
          <img src={review.avatar} alt={review.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
            {review.name[0]}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-ink leading-tight">{review.name}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
    </div>
  );
}
