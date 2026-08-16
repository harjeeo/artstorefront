import Header from './components/Header';
import Hero from './components/Hero';
import CategorySlider from './components/CategorySlider';
import ProductSlider from './components/ProductSlider';
import ReelsSlider from './components/ReelsSlider';
import TopArtists from './components/TopArtists';
import ExploreRelatedSearches from './components/ExploreRelatedSearches';
import Footer from './components/Footer';
import { featuredProducts, trendingProducts } from './data/homeData';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategorySlider />
        <ProductSlider title="Featured Products" products={featuredProducts} />
        <ProductSlider title="Trending Products" products={trendingProducts} />
        <ReelsSlider />
        <TopArtists />
        <ExploreRelatedSearches />
      </main>
      <Footer />
    </div>
  );
}
