'use client';

import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  UserIcon,
  PackageIcon,
  FavouriteIcon,
  StarIcon,
  Location01Icon,
  InboxIcon,
  Logout03Icon,
} from '@hugeicons/core-free-icons';
import NavLink from '../NavLink';

const navItems = [
  { to: '/account/profile', label: 'Profile', icon: UserIcon },
  { to: '/account/orders', label: 'Your Orders', icon: PackageIcon },
  { to: '/account/wishlist', label: 'Wishlist', icon: FavouriteIcon },
  { to: '/account/reviews', label: 'My Reviews', icon: StarIcon },
  { to: '/account/address', label: 'Your Address', icon: Location01Icon },
  { to: '/account/requests', label: 'Requests', icon: InboxIcon },
];

export default function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <nav className="w-full lg:w-64 shrink-0 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive ? 'bg-ink text-white' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <HugeiconsIcon icon={item.icon} size={20} />
          {item.label}
        </NavLink>
      ))}

      <div className="pt-2 mt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Logout03Icon} size={20} />
          Logout
        </button>
      </div>
    </nav>
  );
}
