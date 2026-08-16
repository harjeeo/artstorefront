import { exploreRelatedTop, exploreRelatedPills } from '../data/homeData';

export default function ExploreRelatedSearches() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">
        Explore Related Searches
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {exploreRelatedTop.map((item, i) => (
          <a
            key={`${item.label}-${i}`}
            href={`/search?q=${encodeURIComponent(item.label)}`}
            className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-3 hover:border-ink hover:shadow-sm transition-all"
          >
            <img
              src={item.image}
              alt={item.label}
              className="h-11 w-11 rounded-lg object-cover shrink-0"
              loading="lazy"
            />
            <span className="text-sm font-medium text-ink leading-snug">{item.label}</span>
          </a>
        ))}
      </div>

      <p className="text-base sm:text-lg font-serif font-medium text-ink mb-4">
        Explore more related searches
      </p>
      <div className="flex flex-wrap gap-3">
        {exploreRelatedPills.map((pill) => (
          <a
            key={pill}
            href={`/search?q=${encodeURIComponent(pill)}`}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-ink transition-colors"
          >
            {pill}
          </a>
        ))}
      </div>
    </section>
  );
}
