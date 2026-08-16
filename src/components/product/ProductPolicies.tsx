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
  const [country] = useState(() => product.delivery.deliverTo.split(',')[0]?.trim() || 'India');
  const [pincode, setPincode] = useState(
    () => product.delivery.deliverTo.split(',')[1]?.trim() || ''
  );
  const [editingPincode, setEditingPincode] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(pincode);
  const [pincodeError, setPincodeError] = useState('');

  const startEditingPincode = () => {
    setPincodeInput(pincode);
    setPincodeError('');
    setEditingPincode(true);
  };

  const savePincode = () => {
    if (!/^\d{6}$/.test(pincodeInput)) {
      setPincodeError('Enter a valid 6-digit pincode');
      return;
    }
    setPincode(pincodeInput);
    setEditingPincode(false);
  };

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
        {editingPincode ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 shrink-0">Deliver to {country},</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                autoFocus
                className="w-24 rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm text-ink focus:outline-none focus:border-ink"
              />
              <button
                type="button"
                onClick={savePincode}
                className="px-3 py-1.5 rounded-full bg-ink hover:bg-black text-white text-xs font-semibold cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingPincode(false)}
                className="px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 text-ink text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
            {pincodeError && <p className="text-xs text-red-600">{pincodeError}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>
              Deliver to&nbsp;<span className="font-semibold text-ink">{country}, {pincode}</span>
            </span>
            <button
              type="button"
              onClick={startEditingPincode}
              aria-label="Edit delivery address"
              className="text-gray-500 hover:text-ink cursor-pointer"
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
            </button>
          </div>
        )}
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
