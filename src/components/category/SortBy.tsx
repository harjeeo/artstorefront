import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { sortOptions } from '../../data/categoryPageData';

interface SortByProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortBy({ value, onChange }: SortByProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((o) => o.id === value) ?? sortOptions[0];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-ink hover:border-ink transition-colors cursor-pointer"
      >
        <span className="text-gray-500">Sort by:</span>
        {current.label}
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg z-20 py-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onChange(option.id);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer"
            >
              {option.label}
              {option.id === value && <HugeiconsIcon icon={Tick01Icon} size={16} className="text-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
