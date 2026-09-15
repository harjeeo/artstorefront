'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface NavLinkProps {
  to: string;
  end?: boolean;
  className: (state: { isActive: boolean }) => string;
  children: ReactNode;
}

export default function NavLink({ to, end = false, className, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link href={to} className={className({ isActive })}>
      {children}
    </Link>
  );
}
