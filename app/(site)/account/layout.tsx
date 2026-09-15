import type { ReactNode } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
