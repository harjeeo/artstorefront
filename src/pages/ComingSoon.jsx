import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-3">
        This page is coming soon
      </h1>
      <p className="text-gray-500 mb-8">We're still building this part of the storefront.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
