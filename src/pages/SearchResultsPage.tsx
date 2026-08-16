import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import ProductCard from '../components/ProductCard';
import { searchCatalog } from '../data/searchIndex';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return searchCatalog.filter((p) => {
      const title = p.title.toLowerCase();
      return words.every((word) => title.includes(word));
    });
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-1.5">
        Search results for &ldquo;{query}&rdquo;
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        {results.length} {results.length === 1 ? 'product' : 'products'} found
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} className="w-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <HugeiconsIcon icon={Search01Icon} size={40} className="text-gray-300 mb-4" />
          <p className="font-medium text-ink mb-1">No products match &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-gray-500 mb-6">Try a different search term.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
