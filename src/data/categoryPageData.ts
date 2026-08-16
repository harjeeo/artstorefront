import { categories } from './homeData';

export const priceRanges = [
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 500 },
  { id: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { id: '1000-2500', label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
  { id: '2500-5000', label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
  { id: 'over-5000', label: 'Over ₹5,000', min: 5000, max: Infinity },
];

export const colorSwatches = [
  { id: 'black', label: 'Black', hex: '#111111' },
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'beige', label: 'Beige', hex: '#e7ddc9' },
  { id: 'red', label: 'Red', hex: '#e0453f' },
  { id: 'blue', label: 'Blue', hex: '#3b6ec2' },
  { id: 'green', label: 'Green', hex: '#4c8c5c' },
  { id: 'pink', label: 'Pink', hex: '#e58fb0' },
  { id: 'gold', label: 'Gold', hex: '#c9a24b' },
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'best-selling', label: 'Best Selling' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Avg. Rating' },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.id === slug);
}

// Deterministic-ish total product count per category, so it stays
// stable across renders instead of re-rolling on every visit.
export function getCategoryTotalCount(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 400 + (h % 1800);
}
