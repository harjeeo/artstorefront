import type { ReactNode } from 'react';

interface RadioCardProps {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  trailing?: ReactNode;
}

export default function RadioCard({ name, checked, onChange, children, trailing }: RadioCardProps) {
  return (
    <label
      className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 cursor-pointer transition-colors ${
        checked ? 'border-ink ring-1 ring-ink' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <span className="flex items-center gap-3 min-w-0">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-4.5 w-4.5 accent-ink shrink-0 cursor-pointer"
        />
        <span className="min-w-0">{children}</span>
      </span>
      {trailing && <span className="shrink-0 text-sm font-semibold text-ink">{trailing}</span>}
    </label>
  );
}
