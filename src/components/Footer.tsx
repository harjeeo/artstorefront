import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AppleIcon,
  PlayStoreIcon,
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons';

const columns = [
  {
    title: 'Shop',
    links: ['Gift cards', 'Artisan Registry', 'Sitemap', 'Artisan blog', 'Artisan United Kingdom', 'Artisan Germany', 'Artisan Canada'],
  },
  {
    title: 'Sell',
    links: ['Seller Handbook', 'Teams', 'Forums', 'Affiliates & Creators'],
  },
  {
    title: 'About',
    links: [
      { label: 'About Us', to: '/about-us' },
      'Investors',
      'Careers',
      'Press',
      'Impact',
      'Legal imprint',
    ],
  },
  {
    title: 'Help',
    links: [
      'Help Centre',
      'Privacy settings',
      { label: 'Refund & Cancellation Policy', to: '/refund-policy' },
      { label: 'Shipping & Delivery Policy', to: '/shipping-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f2ece3] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-10">
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-ink leading-tight">
              We're on a mission to
              <br />
              keep commerce human.
            </h2>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-ink mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const label = typeof link === 'string' ? link : link.label;
                  const to = typeof link === 'string' ? undefined : link.to;
                  return (
                    <li key={label}>
                      {to ? (
                        <Link to={to} className="text-sm text-gray-700 hover:text-ink hover:underline">
                          {label}
                        </Link>
                      ) : (
                        <a href="/" className="text-sm text-gray-700 hover:text-ink hover:underline">
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-black/85 transition-colors"
          >
            <HugeiconsIcon icon={AppleIcon} size={20} />
            <span>
              Download on the
              <br />
              <span className="font-semibold text-base leading-none">App Store</span>
            </span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-black/85 transition-colors"
          >
            <HugeiconsIcon icon={PlayStoreIcon} size={20} />
            <span>
              Get it on
              <br />
              <span className="font-semibold text-base leading-none">Google Play</span>
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="text-sm text-gray-700">India</span>
            <div className="flex items-center gap-4 text-ink">
              <a href="/" aria-label="Instagram" className="hover:text-brand">
                <HugeiconsIcon icon={InstagramIcon} size={20} />
              </a>
              <a href="/" aria-label="Facebook" className="hover:text-brand">
                <HugeiconsIcon icon={FacebookIcon} size={20} />
              </a>
              <a href="/" aria-label="Pinterest" className="hover:text-brand">
                <HugeiconsIcon icon={PinterestIcon} size={20} />
              </a>
              <a href="/" aria-label="Youtube" className="hover:text-brand">
                <HugeiconsIcon icon={YoutubeIcon} size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-700">
            <span>&copy; 2026 Artisan, Inc.</span>
            <Link to="/terms-conditions" className="hover:underline">Terms of Use</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
            <a href="/" className="hover:underline">Interest-based ads</a>
            <a href="/" className="hover:underline">Local Shops</a>
            <a href="/" className="hover:underline">Regions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
