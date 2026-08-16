import { NavLink, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  Tag01Icon,
  ShoppingBag01Icon,
  AnalyticsUpIcon,
  Wallet01Icon,
  UserIcon,
  Settings02Icon,
  Logout03Icon,
} from '@hugeicons/core-free-icons';

const navItems = [
  { to: 'dashboard', label: 'Dashboard', icon: DashboardSquare01Icon },
  { to: 'listings', label: 'Listings', icon: Tag01Icon },
  { to: 'orders', label: 'Orders', icon: ShoppingBag01Icon },
  { to: 'stats', label: 'Stats', icon: AnalyticsUpIcon },
  { to: 'payments', label: 'Payments', icon: Wallet01Icon },
  { to: 'profile', label: 'Profile', icon: UserIcon },
  { to: 'settings', label: 'Settings', icon: Settings02Icon },
];

export default function ArtistSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="flex flex-col h-full w-64 shrink-0 bg-white border-r border-gray-200 px-4 py-6">
      <div className="px-2 mb-8">
        <span className="text-2xl font-bold tracking-tight text-brand">Artisan</span>
        <p className="text-xs text-gray-500 mt-0.5">Seller Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1">
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
      </nav>

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
    </aside>
  );
}
