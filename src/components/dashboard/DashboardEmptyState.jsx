import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';

export default function DashboardEmptyState({ icon, title, description, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-xl border border-gray-200 py-20 px-6">
      <HugeiconsIcon icon={icon} size={40} className="text-gray-300 mb-4" />
      <p className="font-medium text-ink mb-1">{title}</p>
      {description && <p className="text-sm text-gray-500 max-w-sm">{description}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center mt-6 px-6 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
