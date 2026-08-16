export const savedAddresses = [
  {
    id: 'addr-1',
    label: '297 C',
    isDefault: true,
    line1: 'Guru Nanak Nagar, Vill Gill',
    line2: 'Ludhiana, Punjab 141116, India',
  },
  {
    id: 'addr-2',
    label: 'Office',
    isDefault: false,
    line1: '4th Floor, Cyber Hub',
    line2: 'Gurugram, Haryana 122002, India',
  },
];

export const shippingMethods = [
  { id: 'standard', label: 'Standard Delivery', eta: '5-9 business days', price: 0 },
  { id: 'express', label: 'Express Delivery', eta: '2-4 business days', price: 199 },
];

export const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when your order arrives' },
  { id: 'card', label: 'Pay Online', description: 'Card, UPI, Netbanking — via Stripe (test mode)' },
];
