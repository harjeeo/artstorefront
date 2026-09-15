import type { Metadata } from 'next';
import RefundPolicyPage from '@/views/RefundPolicyPage';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Artisan',
};

export default function Page() {
  return <RefundPolicyPage />;
}
