import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Order } from '../types';

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);
const ORDERS_KEY = 'artisan-orders';

const demoOrders: Order[] = [
  {
    id: 'AR-482913',
    placedAt: '2026-08-02T10:30:00.000Z',
    status: 'Delivered',
    items: [
      {
        id: 'demo-3',
        title: 'Personalized Leather Journal, Engraved Gift',
        image: 'https://picsum.photos/seed/order-1a/500/500',
        price: 1450,
        quantity: 1,
        size: 'M',
        color: 'natural',
      },
      {
        id: 'demo-4',
        title: 'Boho Macrame Wall Hanging, Cotton',
        image: 'https://picsum.photos/seed/order-1b/500/500',
        price: 890,
        quantity: 2,
        size: '',
        color: '',
      },
    ],
    address: {
      houseNo: '297 C',
      addressLine1: 'Guru Nanak Nagar, Vill Gill',
      addressLine2: '',
      city: 'Ludhiana',
      state: 'Punjab',
      pincode: '141116',
      country: 'India',
    },
    shipping: 0,
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'AR-317755',
    placedAt: '2026-07-18T15:05:00.000Z',
    status: 'Shipped',
    items: [
      {
        id: 'demo-6',
        title: 'Musical Wooden Ballerina Carousel Box',
        image: 'https://picsum.photos/seed/order-2a/500/500',
        price: 3180,
        quantity: 1,
        size: '',
        color: '',
      },
    ],
    address: {
      houseNo: 'Office',
      addressLine1: '4th Floor, Cyber Hub',
      addressLine2: '',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      country: 'India',
    },
    shipping: 199,
    paymentMethod: 'Pay Online',
  },
  {
    id: 'AR-206140',
    placedAt: '2026-06-29T09:15:00.000Z',
    status: 'Processing',
    items: [
      {
        id: 'demo-9',
        title: 'Minimalist Gold Hoop Earrings, Sterling Silver',
        image: 'https://picsum.photos/seed/order-3a/500/500',
        price: 2200,
        quantity: 1,
        size: '',
        color: 'gold',
      },
    ],
    address: {
      houseNo: '297 C',
      addressLine1: 'Guru Nanak Nagar, Vill Gill',
      addressLine2: '',
      city: 'Ludhiana',
      state: 'Punjab',
      pincode: '141116',
      country: 'India',
    },
    shipping: 0,
    paymentMethod: 'Cash on Delivery',
  },
];

function loadFromStorage(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : demoOrders;
  } catch {
    return demoOrders;
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const value = useMemo<OrdersContextValue>(
    () => ({ orders, addOrder, getOrderById }),
    [orders, addOrder, getOrderById]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider');
  return ctx;
}
