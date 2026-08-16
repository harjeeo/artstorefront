import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import ImageGallery from '../components/product/ImageGallery';
import BuyBox from '../components/product/BuyBox';
import ProductPolicies from '../components/product/ProductPolicies';
import ReviewsSection from '../components/product/ReviewsSection';
import ProductSlider from '../components/ProductSlider';
import { getProductById } from '../data/productDetailData';
import { makeProducts } from '../data/homeData';

export default function ProductPage() {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id ?? 'demo'), [id]);
  const relatedProducts = useMemo(() => makeProducts(`related-${id}`, 10), [id]);
  const recentlyViewed = useMemo(() => makeProducts(`recent-${id}`, 10), [id]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-ink hover:underline">
            Home
          </Link>
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          <span className="text-ink font-medium truncate max-w-xs">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 xl:gap-14">
          {/* Left column: gallery + reviews */}
          <div>
            <ImageGallery product={product} />
            <ReviewsSection
              productId={product.id}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>

          {/* Right column: buy box + policies */}
          <div className="lg:sticky lg:top-24 self-start flex flex-col gap-6">
            <BuyBox product={product} />
            <ProductPolicies product={product} />
          </div>
        </div>
      </div>

      <ProductSlider title="You may also like" products={relatedProducts} />
      <ProductSlider title="Recently Viewed" products={recentlyViewed} />
    </>
  );
}
