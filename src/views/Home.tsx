import Hero from '../components/Hero';
import CategorySlider from '../components/CategorySlider';
import ProductSlider from '../components/ProductSlider';
import ReelsSlider from '../components/ReelsSlider';
import TopArtists from '../components/TopArtists';
import ExploreRelatedSearches from '../components/ExploreRelatedSearches';
import { featuredProducts, trendingProducts } from '../data/homeData';

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySlider />
      <ProductSlider title="Featured Products" products={featuredProducts} />
      <ProductSlider title="Trending Products" products={trendingProducts} />
      <ReelsSlider />
      <TopArtists />
      <ExploreRelatedSearches />
    </>
  );
}
