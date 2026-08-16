import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

function getPageList(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withEllipsis = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) withEllipsis.push('...');
    withEllipsis.push(page);
  });
  return withEllipsis;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = getPageList(page, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-ink transition-colors cursor-pointer"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`h-10 w-10 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              p === page ? 'bg-ink text-white' : 'text-ink hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-ink transition-colors cursor-pointer"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
      </button>
    </nav>
  );
}
