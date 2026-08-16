import type { ArtistListing } from '../types';

const titles = [
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
  'Custom Embroidered T-Shirt, Handmade Gift',
  'Terracotta Plant Pot, Hand Painted',
];

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const initialListings: ArtistListing[] = titles.map((title, i) => ({
  id: `listing-${i + 1}`,
  title,
  image: `https://picsum.photos/seed/listing-${i + 1}/200/200`,
  createdAt: daysAgo(i * 5 + (i % 3)),
  status: i % 7 === 0 ? 'disabled' : 'active',
}));
