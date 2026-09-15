import type { ReactNode } from 'react';
import ArtistDashboardLayout from '@/components/artist-dashboard/ArtistDashboardLayout';

export default function ArtistLayout({ children }: { children: ReactNode }) {
  return <ArtistDashboardLayout>{children}</ArtistDashboardLayout>;
}
