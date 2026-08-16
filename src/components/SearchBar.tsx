import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { searchCatalog } from '../data/searchIndex';

const MAX_SUGGESTIONS = 6;

interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
}

export default function SearchBar({ variant = 'desktop' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchCatalog.filter((p) => p.title.toLowerCase().includes(q)).slice(0, MAX_SUGGESTIONS);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const goToResults = () => {
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const goToProduct = (id: string) => {
    setOpen(false);
    navigate(`/product/${id}`);
  };

  const inputHeight = variant === 'mobile' ? 'py-2' : 'py-2.5';
  const buttonSize = variant === 'mobile' ? 'h-9 w-11' : 'h-10 w-12';
  const iconSize = variant === 'mobile' ? 18 : 20;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToResults();
        }}
        className="flex w-full items-center rounded-full border-2 border-ink overflow-hidden focus-within:border-brand transition-colors"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search for handmade products, art, gifts..."
          className={`w-full px-4 ${inputHeight} text-sm outline-none`}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              setOpen(false);
            }}
            className="flex items-center justify-center h-8 w-8 shrink-0 text-gray-400 hover:text-ink cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
          </button>
        )}
        <button
          type="submit"
          aria-label="Search"
          className={`flex items-center justify-center ${buttonSize} bg-ink text-white hover:bg-black transition-colors cursor-pointer shrink-0`}
        >
          <HugeiconsIcon icon={Search01Icon} size={iconSize} />
        </button>
      </form>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
          {results.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => goToProduct(product.id)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <img
                src={product.image}
                alt=""
                className="h-10 w-10 rounded-lg object-cover bg-gray-100 shrink-0"
                loading="lazy"
              />
              <span className="flex-1 min-w-0 text-sm text-ink line-clamp-1">{product.title}</span>
              <span className="text-sm font-semibold text-ink shrink-0">
                ₹ {product.price.toLocaleString('en-IN')}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={goToResults}
            className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-brand hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100"
          >
            <HugeiconsIcon icon={Search01Icon} size={14} />
            See all results for "{query.trim()}"
          </button>
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-gray-200 bg-white shadow-lg z-50 px-4 py-4 text-sm text-gray-500 text-center">
          No products found for "{query.trim()}"
        </div>
      )}
    </div>
  );
}
