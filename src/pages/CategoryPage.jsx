import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, FilterIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
import ProductCard from '../components/ProductCard';
import FiltersSidebar from '../components/category/FiltersSidebar';
import SortBy from '../components/category/SortBy';
import Pagination from '../components/category/Pagination';
import { makeProducts } from '../data/homeData';
import { getCategoryBySlug, getCategoryTotalCount, priceRanges } from '../data/categoryPageData';

const PRODUCTS_PER_PAGE = 48; // 12 rows x 4 columns

const emptyFilters = () => ({
  categories: new Set(),
  prices: new Set(),
  colors: new Set(),
  sizes: new Set(),
});

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug) ?? { id: slug, name: slug };
  const totalCount = getCategoryTotalCount(slug);
  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE));

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevance');
  const [filters, setFilters] = useState(emptyFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setPage(1);
    setFilters(emptyFilters());
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const pageProducts = useMemo(
    () => makeProducts(`${slug}-p${page}`, PRODUCTS_PER_PAGE),
    [slug, page]
  );

  const visibleProducts = useMemo(() => {
    let list = pageProducts;

    if (filters.prices.size > 0) {
      const ranges = priceRanges.filter((r) => filters.prices.has(r.id));
      list = list.filter((p) => ranges.some((r) => p.price >= r.min && p.price < r.max));
    }
    if (filters.colors.size > 0) {
      list = list.filter((p) => filters.colors.has(p.color.toLowerCase()));
    }

    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === 'best-selling') sorted.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));

    return sorted;
  }, [pageProducts, filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-ink hover:underline">
          Home
        </Link>
        <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        <span className="text-ink font-medium">{category.name}</span>
      </div>

      {/* Category header */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-ink">{category.name}</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            <span className="font-mono">/{slug}</span>
            <span className="mx-2">&middot;</span>
            {totalCount.toLocaleString('en-IN')} products
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters — desktop */}
        <div className="hidden lg:block">
          <FiltersSidebar
            filters={filters}
            onChange={setFilters}
            onClearAll={() => setFilters(emptyFilters())}
            activeCategorySlug={slug}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 text-sm font-medium cursor-pointer"
            >
              <HugeiconsIcon icon={FilterIcon} size={18} />
              Filters
            </button>
            <p className="hidden sm:block text-sm text-gray-500">
              Showing {visibleProducts.length} of {PRODUCTS_PER_PAGE} on this page
            </p>
            <SortBy value={sort} onChange={setSort} />
          </div>

          {/* Product grid */}
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} className="w-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
              <p className="font-medium">No products match these filters.</p>
              <button
                type="button"
                onClick={() => setFilters(emptyFilters())}
                className="mt-3 text-sm text-brand hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      {/* Filters — mobile drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-ink">Filters</span>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>
            <FiltersSidebar
              filters={filters}
              onChange={setFilters}
              onClearAll={() => setFilters(emptyFilters())}
              activeCategorySlug={slug}
            />
          </div>
        </div>
      )}
    </div>
  );
}
