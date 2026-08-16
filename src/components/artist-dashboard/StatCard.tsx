import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';

interface StatCardProps {
  icon: IconSvgElement;
  label: string;
  value: string;
  change?: string;
}

export default function StatCard({ icon, label, value, change }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand/10 text-brand">
          <HugeiconsIcon icon={icon} size={20} />
        </div>
        {change && (
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-ink">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
