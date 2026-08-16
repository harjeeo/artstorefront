import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, ArrowUp01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { categories } from '../../data/homeData';
import { priceRanges, colorSwatches, sizes } from '../../data/categoryPageData';

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-5 border-b border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-ink cursor-pointer"
      >
        {title}
        <HugeiconsIcon icon={open ? ArrowUp01Icon : ArrowDown01Icon} size={18} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function Checkbox({ checked, onChange, label, count }) {
  return (
    <label className="flex items-center justify-between gap-2 py-1.5 cursor-pointer group">
      <span className="flex items-center gap-2.5">
        <span
          className={`flex items-center justify-center h-4.5 w-4.5 rounded border shrink-0 transition-colors ${
            checked ? 'bg-ink border-ink' : 'border-gray-400 group-hover:border-ink'
          }`}
        >
          {checked && <HugeiconsIcon icon={Tick01Icon} size={12} className="text-white" />}
        </span>
        <span className="text-sm text-gray-700">{label}</span>
      </span>
      {count != null && <span className="text-xs text-gray-400">{count}</span>}
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    </label>
  );
}

export default function FiltersSidebar({ filters, onChange, onClearAll, activeCategorySlug }) {
  const toggleInSet = (key, value) => {
    const current = new Set(filters[key]);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    onChange({ ...filters, [key]: current });
  };

  const hasActiveFilters =
    filters.categories.size > 0 ||
    filters.prices.size > 0 ||
    filters.colors.size > 0 ||
    filters.sizes.size > 0;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-ink">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-medium text-brand hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Categories">
        <div className="max-h-64 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <Checkbox
              key={cat.id}
              label={cat.name}
              checked={cat.id === activeCategorySlug || filters.categories.has(cat.id)}
              onChange={() => toggleInSet('categories', cat.id)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        {priceRanges.map((range) => (
          <Checkbox
            key={range.id}
            label={range.label}
            checked={filters.prices.has(range.id)}
            onChange={() => toggleInSet('prices', range.id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-3">
          {colorSwatches.map((color) => {
            const active = filters.colors.has(color.id);
            return (
              <button
                key={color.id}
                type="button"
                title={color.label}
                aria-pressed={active}
                onClick={() => toggleInSet('colors', color.id)}
                className={`relative h-8 w-8 rounded-full border shrink-0 cursor-pointer transition-shadow ${
                  active ? 'ring-2 ring-offset-2 ring-ink' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {active && (
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    size={14}
                    className={color.id === 'white' ? 'text-ink' : 'text-white'}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = filters.sizes.has(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => toggleInSet('sizes', size)}
                className={`px-3.5 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${
                  active
                    ? 'bg-ink text-white border-ink'
                    : 'border-gray-300 text-gray-700 hover:border-ink'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </aside>
  );
}
