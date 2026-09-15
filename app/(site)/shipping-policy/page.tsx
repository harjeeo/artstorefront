import type { Metadata } from 'next';
import ShippingPolicyPage from '@/views/ShippingPolicyPage';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — Artisan',
};

export default function Page() {
  return <ShippingPolicyPage />;
}
