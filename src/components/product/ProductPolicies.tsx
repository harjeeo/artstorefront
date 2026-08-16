import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Calendar03Icon,
  Location01Icon,
  PencilEdit02Icon,
  Message01Icon,
  UserAdd01Icon,
} from '@hugeicons/core-free-icons';
import type { ProductDetail } from '../../data/productDetailData';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

function Accordion({ title, defaultOpen = false, children }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-200 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-ink cursor-pointer"
      >
        {title}
        <HugeiconsIcon icon={open ? ArrowUp01Icon : ArrowDown01Icon} size={18} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function ProductPolicies({ product }: { product: ProductDetail }) {
  const [following, setFollowing] = useState(false);

  return (
    <div>
      <Accordion title="Item details">
        <ul className="space-y-2">
          {product.itemDetails.map((line) => (
            <li key={line} className="text-sm text-gray-600 leading-relaxed">
              &bull; {line}
            </li>
          ))}
        </ul>
      </Accordion>

      <Accordion title="Delivery and return policies" defaultOpen>
        <div className="flex items-start gap-3 mb-4">
          <HugeiconsIcon icon={Calendar03Icon} size={20} className="text-ink shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Order today to get by{' '}
            <span className="font-semibold text-ink">
              {product.delivery.estimateStart}-{product.delivery.estimateEnd}
            </span>
          </p>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <HugeiconsIcon icon={Location01Icon} size={20} className="text-ink shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Sent from:&nbsp;<span className="font-semibold text-ink">{product.delivery.sentFrom}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>
            Deliver to&nbsp;<span className="font-semibold text-ink">{product.delivery.deliverTo}</span>
          </span>
          <button
            type="button"
            aria-label="Edit delivery address"
            className="text-gray-500 hover:text-ink cursor-pointer"
          >
            <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
          </button>
        </div>
      </Accordion>

      <Accordion title="Meet your seller" defaultOpen>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold text-ink">{product.seller.name}</p>
            <p className="text-sm text-gray-500">
              Owner of{' '}
              <Link to={`/shop/${product.seller.shopName}`} className="text-brand hover:underline">
                {product.seller.shopName}
              </Link>
            </p>
            <button
              type="button"
              onClick={() => setFollowing((f) => !f)}
              className="flex items-center gap-1.5 mt-1 text-sm font-medium text-ink hover:text-brand cursor-pointer"
            >
              <HugeiconsIcon icon={UserAdd01Icon} size={16} />
              {following ? 'Following' : 'Follow shop'}
            </button>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Message01Icon} size={18} />
          Message {product.seller.name}
        </button>
        <p className="text-center text-xs text-gray-500 mt-3">
          This seller usually responds <span className="font-semibold">{product.seller.responseTime}</span>.
        </p>
      </Accordion>
    </div>
  );
}
