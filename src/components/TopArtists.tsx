import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon } from '@hugeicons/core-free-icons';
import Slider from './Slider';
import { topArtists } from '../data/homeData';

export default function TopArtists() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Top Artists</h2>
      <Slider>
        {topArtists.map((artist) => (
          <a
            key={artist.id}
            href={`/shop/${artist.shopName}`}
            className="snap-start shrink-0 w-40 sm:w-44 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group block"
          >
            <div className="h-32 sm:h-36 rounded-t-xl overflow-hidden bg-gray-100">
              <img
                src={artist.cover}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center px-3 pb-4 -mt-8">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                loading="lazy"
              />
              <p className="mt-2 text-sm font-semibold text-ink truncate w-full">{artist.name}</p>
              <p className="text-xs text-gray-500 truncate w-full">{artist.shopName}</p>
              <span className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand/10 text-[11px] font-semibold text-brand">
                <HugeiconsIcon icon={StarIcon} size={11} className="fill-brand" />
                {artist.rating}
              </span>
            </div>
          </a>
        ))}
      </Slider>
    </section>
  );
}
