import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Artisan',
};

export default function Page() {
  return <TermsPage />;
}
