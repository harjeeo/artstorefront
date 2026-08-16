import Slider from './Slider';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductSliderProps {
  title: string;
  products: Product[];
}

export default function ProductSlider({ title, products }: ProductSliderProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">{title}</h2>
      <Slider>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </section>
  );
}
