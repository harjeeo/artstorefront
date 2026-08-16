import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Explore', to: '/' },
  { label: 'Clothing', to: '/category/clothing' },
  { label: 'Phone Cases', to: '/category/phone-cases' },
  { label: 'Wall Art', to: '/category/wall-art' },
  { label: 'Home & Living', to: '/category/home-living' },
  { label: 'Accessories', to: '/category/accessories' },
  { label: 'Gifts', to: '/category/gifts' },
];

export default function CategoryNav() {
  return (
    <nav className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-1 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-brand text-brand'
                    : 'border-transparent text-gray-700 hover:text-ink hover:border-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
