import Slider from './Slider';
import { reels } from '../data/homeData';

export default function ReelsSlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Reels</h2>
      <Slider>
        {reels.map((reel) => (
          <a
            key={reel.id}
            href={`/reels/${reel.id}`}
            className="snap-start shrink-0 w-40 sm:w-48 group"
          >
            <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-9/16">
              <video
                src={reel.video}
                poster={reel.poster}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-semibold truncate">{reel.shop}</p>
                <p className="text-white/80 text-[11px] line-clamp-2 leading-snug">{reel.title}</p>
              </div>
            </div>
          </a>
        ))}
      </Slider>
    </section>
  );
}
