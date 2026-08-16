// Placeholder data — real content will come from the backend API later.
import type { Category, Product } from '../types';

export const categories: Category[] = [
  { id: 'jewelry', name: 'Jewelry', image: 'https://picsum.photos/seed/cat-jewelry/200/200' },
  { id: 'home-decor', name: 'Home Decor', image: 'https://picsum.photos/seed/cat-decor/200/200' },
  { id: 'clothing', name: 'Clothing', image: 'https://picsum.photos/seed/cat-clothing/200/200' },
  { id: 'art', name: 'Art & Collectibles', image: 'https://picsum.photos/seed/cat-art/200/200' },
  { id: 'wedding', name: 'Wedding', image: 'https://picsum.photos/seed/cat-wedding/200/200' },
  { id: 'toys', name: 'Toys & Games', image: 'https://picsum.photos/seed/cat-toys/200/200' },
  { id: 'craft-supplies', name: 'Craft Supplies', image: 'https://picsum.photos/seed/cat-craft/200/200' },
  { id: 'bags', name: 'Bags & Purses', image: 'https://picsum.photos/seed/cat-bags/200/200' },
  { id: 'accessories', name: 'Accessories', image: 'https://picsum.photos/seed/cat-accessories/200/200' },
  { id: 'gifts', name: 'Gifts', image: 'https://picsum.photos/seed/cat-gifts/200/200' },
  { id: 'phone-cases', name: 'Phone Cases', image: 'https://picsum.photos/seed/cat-phonecases/200/200' },
  { id: 'wall-art', name: 'Wall Art', image: 'https://picsum.photos/seed/cat-wallart/200/200' },
  { id: 'home-living', name: 'Home & Living', image: 'https://picsum.photos/seed/cat-homeliving/200/200' },
];

const productTitles = [
  'Custom Name Embroidered Wooden Sign',
  'Handmade Ceramic Vase, Minimalist Decor',
  'Personalized Leather Journal, Engraved Gift',
  'Boho Macrame Wall Hanging, Cotton',
  'Raw Crystal Necklace, Rose Quartz Pendant',
  'Musical Wooden Ballerina Carousel Box',
  'Custom Pet Portrait, Digital Illustration',
  'Hand Embroidered Vintage Flag, Wall Art',
  'Personalized Wedding Cake Server Set',
  'Minimalist Gold Hoop Earrings, Sterling Silver',
  'Custom Birth Flower Bracelet, Dainty Gift',
  'Handwoven Cotton Throw Blanket',
  'Personalized Phone Case, Custom Name',
  'Marble Print Phone Case, Slim Fit',
  'Botanical Line Art Print, Wall Decor',
  'Abstract Canvas Wall Art, Framed Print',
  'Canvas Tote Bag, Hand Printed',
  'Woven Straw Beach Bag',
  'Leather Crossbody Bag, Handstitched',
  'Scented Soy Candle, Lavender',
  'Ceramic Coffee Mug, Hand Painted',
  'Chunky Knit Beanie Hat, Wool Blend',
  'Cotton Knit Scarf, Handwoven',
  'Embroidered Throw Cushion Cover',
  'Handmade Coaster Set, Cork Base',
  'Engraved Wooden Keychain',
  'Personalized Photo Bookmark',
  'Ceramic Succulent Planter, Small',
  'Custom Family Portrait Frame',
  'Hand Painted Christmas Ornament',
  'Linen Kitchen Apron, Adjustable',
  'Wooden Serving Tray, Engraved',
  'Handmade Lavender Soap Bar Set',
  'Custom Name Wall Sign, Wooden',
  'Desk Calendar, Illustrated',
  'Personalized Fridge Magnet Set',
  'Botanical Wall Art Poster, Set of 3',
  'Sterling Silver Stacking Rings',
  'Rattan Storage Basket, Home & Living',
  'Handwoven Table Runner, Cotton',
];

const colors = ['Black', 'White', 'Beige', 'Red', 'Blue', 'Green', 'Pink', 'Gold'];

// Small deterministic string-seeded PRNG so the same seed always
// produces the same "random" data (stable across re-renders / pages).
function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function random() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function makeProducts(seedPrefix: string, count = 8): Product[] {
  return Array.from({ length: count }).map((_, i) => {
    const rand = seededRandom(`${seedPrefix}-${i}`);
    const price = Math.round((300 + rand() * 4500) / 10) * 10;
    const original = Math.round(price * (1.4 + rand() * 0.8));
    return {
      id: `${seedPrefix}-${i}`,
      title: productTitles[(i + seedPrefix.length) % productTitles.length],
      image: `https://picsum.photos/seed/${seedPrefix}-${i}/500/500`,
      price,
      originalPrice: original,
      rating: (4 + rand()).toFixed(1),
      color: colors[Math.floor(rand() * colors.length)],
      bestseller: i % 3 === 0,
    };
  });
}

export const featuredProducts = makeProducts('featured', 10);
export const trendingProducts = makeProducts('trending', 10);

export const reels = Array.from({ length: 8 }).map((_, i) => ({
  id: `reel-${i}`,
  poster: `https://picsum.photos/seed/reel-${i}/400/700`,
  video: [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  ][i % 5],
  shop: ['WillowAndOak', 'ClayByRia', 'ThreadAndForm', 'LunaCeramics', 'CraftedNest'][i % 5],
  title: [
    'Behind the scenes: hand-poured candles',
    'Packing your custom order 📦',
    'How this necklace is made',
    'New collection sneak peek',
    'Studio tour with our team',
  ][i % 5],
}));

export const topArtists = Array.from({ length: 10 }).map((_, i) => ({
  id: `artist-${i}`,
  name: [
    'Ananya Sharma', 'Rohan Mehta', 'Priya Nair', 'Kabir Sethi', 'Meera Iyer',
    'Arjun Rao', 'Simran Kaur', 'Dev Patel', 'Isha Verma', 'Nikhil Joshi',
  ][i],
  shopName: [
    'WillowAndOak', 'ClayByRia', 'ThreadAndForm', 'LunaCeramics', 'CraftedNest',
    'PaperAndPine', 'SilverLeafStudio', 'TerraCraft', 'BloomAndBrush', 'OakAndAsh',
  ][i],
  avatar: `https://i.pravatar.cc/150?img=${i + 12}`,
  cover: `https://picsum.photos/seed/artist-cover-${i}/300/200`,
  rating: (4 + ((i * 37) % 10) / 10).toFixed(1),
}));

export const exploreRelatedTop = [
  { label: 'Make Shirt', image: 'https://picsum.photos/seed/rel-1/80/80' },
  { label: 'Embroidery Tshirt', image: 'https://picsum.photos/seed/rel-2/80/80' },
  { label: 'Embroidery Shirt', image: 'https://picsum.photos/seed/rel-3/80/80' },
  { label: 'Tshirt', image: 'https://picsum.photos/seed/rel-4/80/80' },
  { label: 'Tsort', image: 'https://picsum.photos/seed/rel-5/80/80' },
  { label: 'Tisort', image: 'https://picsum.photos/seed/rel-6/80/80' },
  { label: 'Embroidered Shirts', image: 'https://picsum.photos/seed/rel-7/80/80' },
  { label: 'Custom Embroidered Shirt', image: 'https://picsum.photos/seed/rel-8/80/80' },
  { label: 'Embroidery on Tshirts', image: 'https://picsum.photos/seed/rel-9/80/80' },
  { label: 'Embroidery Tshirt', image: 'https://picsum.photos/seed/rel-10/80/80' },
];

export const exploreRelatedPills = [
  'Durable Shirt', 'Shirt Iron Practical', 'Men Tshirt Customized', 'Tshirt Ricamo',
  'Tees Embroidered', 'Top Tshirt Sellers', 'Embroidery Shirt Sleeve',
  'Embroidered Comfort Color Tee Shirt', 'Embroidery Print Tshirt', 'Minimalist Embroidered Tshirt',
  'Embroidered Long Sleeve Jersey', 'Lilac Long Sleeve Custom', 'Custom Embroidered Shirt Cotton Durable',
];
