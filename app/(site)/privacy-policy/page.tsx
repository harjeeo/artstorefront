import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Artisan',
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
