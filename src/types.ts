export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: string | number;
  color?: string;
  bestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Reel {
  id: string;
  poster: string;
  video: string;
  shop: string;
  title: string;
}

export interface Artist {
  id: string;
  name: string;
  shopName: string;
  avatar: string;
  cover: string;
}

export interface CartItem {
  lineId: string;
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  size: string;
  color: string;
  quantity: number;
  saleEndsAt: number;
}

export interface AddableProduct {
  id: string;
  title: string;
  image?: string;
  images?: string[];
  price: number;
  originalPrice?: number;
}

export interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
}

export interface Address {
  id: string;
  houseNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  placedAt: string;
  status: OrderStatus;
  items: OrderItem[];
  address: Omit<Address, 'id' | 'isDefault'>;
  shipping: number;
  paymentMethod: string;
}

export interface MyReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  rating: number;
  text: string;
  date: string;
}
