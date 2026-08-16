export const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const colorOptions = [
  { id: 'natural', label: 'Natural' },
  { id: 'sky-blue', label: 'Sky Blue' },
  { id: 'black', label: 'Black' },
  { id: 'white', label: 'White' },
  { id: 'sage', label: 'Sage' },
];

export function getProductById(id) {
  const images = Array.from({ length: 6 }).map(
    (_, i) => `https://picsum.photos/seed/pd-${id}-${i}/900/900`
  );

  return {
    id,
    title: 'Custom Embroidered T-Shirt, Personalised Text Tee, Handmade Gift',
    price: 1899,
    originalPrice: 3165,
    rating: 5.0,
    reviewCount: 14,
    artistName: 'Connor',
    shopName: 'WonkyStitching',
    shopAvatar: 'https://i.pravatar.cc/150?img=33',
    images,
    thumbnails: [
      { type: 'image', src: images[0] },
      { type: 'video', label: 'Size Guide', poster: images[1] },
      { type: 'image', src: images[2] },
      { type: 'image', src: images[3] },
      { type: 'image', src: images[4] },
      { type: 'image', src: images[5] },
      { type: 'swatches', label: 'T-Shirt Colours' },
      { type: 'chart', label: 'Size Chart' },
    ],
    itemDetails: [
      'Made from 100% combed cotton, 220gsm',
      'Hand embroidered custom text — choose your own wording',
      'Available in 6 sizes and 5 colours',
      'Each piece is made to order, allow 3-5 days for production',
    ],
    delivery: {
      estimateStart: '28 Aug',
      estimateEnd: '5 Sept',
      sentFrom: 'United Kingdom',
      deliverTo: 'India, 141116',
    },
    seller: {
      name: 'Connor',
      shopName: 'WonkyStitching',
      avatar: 'https://i.pravatar.cc/150?img=33',
      responseTime: 'within a few hours',
    },
  };
}

export const reviewSummaryTags = ['Helpful seller', 'Great quality', 'Love it', 'Fast delivery'];

export const reviewCategories = [
  { id: 'quality', label: 'Item quality', score: 5.0 },
  { id: 'delivery', label: 'Delivery', score: 5.0 },
  { id: 'service', label: 'Customer service', score: 5.0 },
  { id: 'recommend', label: 'Buyers\nrecommend', score: '100%' },
];

export const reviewFilterTags = [
  { id: 'seller-service', label: 'Seller service', count: 12 },
  { id: 'quality', label: 'Quality', count: 10 },
  { id: 'delivery', label: 'Delivery & Packaging', count: 5 },
  { id: 'sizing', label: 'Sizing & Fit', count: 1 },
  { id: 'appearance', label: 'Appearance', count: 1 },
];

export const reviews = [
  {
    id: 'r1',
    name: 'Chloe',
    avatar: null,
    date: '14 Aug, 2026',
    rating: 5,
    text: 'Connor was lovely and sent over examples of the design before processing the order so everything was clear. He was friendly and super helpful. Thank you again, I will be ordering again soon!',
  },
  {
    id: 'r2',
    name: 'Lucy',
    avatar: 'https://i.pravatar.cc/150?img=45',
    date: '10 Aug, 2026',
    rating: 5,
    text: "Brilliant quality custom embroidered t-shirt that absolutely exceeded my expectations - I love it and am so happy with the result!! The seller was super helpful and even sent preview mock-ups of the design to see if I was happy with it and whether I wanted to make any changes before it was made. I'd 1000% recommend...",
    image: 'https://picsum.photos/seed/review-2/120/120',
  },
  {
    id: 'r3',
    name: 'Kirstie',
    avatar: 'https://i.pravatar.cc/150?img=48',
    date: '07 Aug, 2026',
    rating: 5,
    text: "The t shirt is perfect and Connor has been amazing throughout the entire process - checking with me on the drafted design, following up. Couldn't have asked for more - I know who my go-to provider for custom t shirts is now :)",
  },
  {
    id: 'r4',
    name: 'Hollie',
    avatar: 'https://i.pravatar.cc/150?img=49',
    date: '31 Jul, 2026',
    rating: 5,
    text: 'Received my custom embroidered t-shirt and it’s perfect! Connor is so attentive and makes sure everything is perfect before creating the product! He also checked in once it had been delivered to make sure it was okay! Definitely going to purchase again ☺️',
  },
];
