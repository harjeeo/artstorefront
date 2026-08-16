import type { Address } from '../types';

export const savedAddresses: Address[] = [
  {
    id: 'addr-1',
    houseNo: '297 C',
    addressLine1: 'Guru Nanak Nagar, Vill Gill',
    addressLine2: '',
    city: 'Ludhiana',
    state: 'Punjab',
    pincode: '141116',
    country: 'India',
    isDefault: true,
  },
  {
    id: 'addr-2',
    houseNo: 'Office',
    addressLine1: '4th Floor, Cyber Hub',
    addressLine2: '',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    country: 'India',
    isDefault: false,
  },
];

export function formatAddressLines(addr: Address) {
  return {
    title: addr.houseNo,
    line1: addr.addressLine1,
    line2: addr.addressLine2,
    line3: `${addr.city}, ${addr.state} ${addr.pincode}, ${addr.country}`,
  };
}

export const shippingMethods = [
  { id: 'standard', label: 'Standard Delivery', eta: '5-9 business days', price: 0 },
  { id: 'express', label: 'Express Delivery', eta: '2-4 business days', price: 199 },
];

export const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when your order arrives' },
  { id: 'card', label: 'Pay Online', description: 'Card, UPI, Netbanking — via Stripe (test mode)' },
];
