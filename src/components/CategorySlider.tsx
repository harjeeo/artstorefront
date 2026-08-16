import { Link } from 'react-router-dom';
import Slider from './Slider';
import { categories } from '../data/homeData';

export default function CategorySlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">
        Shop by Category
      </h2>
      <Slider>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="snap-start shrink-0 flex flex-col items-center gap-3 w-28 sm:w-32 group"
          >
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden ring-1 ring-gray-200 group-hover:ring-brand transition-all">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium text-center text-ink">{cat.name}</span>
          </Link>
        ))}
      </Slider>
    </section>
  );
}
