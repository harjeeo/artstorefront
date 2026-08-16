import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  Cash01Icon,
  CreditCardIcon,
  CheckmarkCircle01Icon,
  ShoppingBag01Icon,
} from '@hugeicons/core-free-icons';
import RadioCard from '../components/checkout/RadioCard';
import AddressForm, { type AddressFormValues } from '../components/checkout/AddressForm';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { savedAddresses, shippingMethods, paymentMethods, formatAddressLines } from '../data/checkoutData';
import type { Address } from '../types';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Field({ label, required, ...props }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        required={required}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
        {...props}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addresses, setAddresses] = useState(savedAddresses);
  const [addressId, setAddressId] = useState(savedAddresses[0]?.id ?? '');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [shippingId, setShippingId] = useState(shippingMethods[0]?.id ?? '');
  const [giftCode, setGiftCode] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentId, setPaymentId] = useState(paymentMethods[0]?.id ?? '');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shipping = useMemo(
    () => shippingMethods.find((m) => m.id === shippingId)?.price ?? 0,
    [shippingId]
  );
  const total = subtotal + shipping;

  const handleApplyGiftCode = () => {
    if (!giftCode.trim()) return;
    setGiftMessage('This code is not valid right now.');
  };

  const handleAddAddress = (values: AddressFormValues) => {
    const id = `addr-${Date.now()}`;
    const newAddress: Address = { id, ...values };
    setAddresses((prev) => [...prev, newAddress]);
    setAddressId(id);
    setShowAddAddress(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const address = addresses.find((a) => a.id === addressId) ?? addresses[0];
    const payment = paymentMethods.find((m) => m.id === paymentId);
    const newOrderNumber = `AR-${Math.floor(100000 + Math.random() * 900000)}`;

    addOrder({
      id: newOrderNumber,
      placedAt: new Date().toISOString(),
      status: 'Processing',
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      address,
      shipping,
      paymentMethod: payment?.label ?? 'Cash on Delivery',
    });

    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={56} className="text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-2">
          Order placed successfully
        </h1>
        <p className="text-gray-500 mb-1">
          Order number <span className="font-semibold text-ink">{orderNumber}</span>
        </p>
        <p className="text-gray-500 mb-8">
          We've emailed the confirmation to <span className="font-medium text-ink">{email || 'your inbox'}</span>.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/account/orders"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-ink text-ink font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            View Order
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <HugeiconsIcon icon={ShoppingBag01Icon} size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-medium text-ink mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add items to your cart before checking out.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        {/* Left: form */}
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field
                label="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
              <Field
                label="Phone"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
              />
            </div>
            <Field
              label="Email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Shipping Address</h2>
            <div className="space-y-3">
              {addresses.map((addr) => {
                const { title, line1, line2, line3 } = formatAddressLines(addr);
                return (
                  <RadioCard
                    key={addr.id}
                    name="address"
                    checked={addressId === addr.id}
                    onChange={() => setAddressId(addr.id)}
                  >
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink">{title}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded-full bg-ink text-white text-[10px] font-semibold tracking-wide">
                          DEFAULT
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-gray-600 mt-0.5">{line1}</span>
                    {line2 && <span className="block text-sm text-gray-600">{line2}</span>}
                    <span className="block text-sm text-gray-600">{line3}</span>
                  </RadioCard>
                );
              })}
            </div>

            {showAddAddress ? (
              <div className="mt-4">
                <AddressForm onSave={handleAddAddress} onCancel={() => setShowAddAddress(false)} />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddAddress(true)}
                className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-ink hover:text-brand cursor-pointer"
              >
                <HugeiconsIcon icon={PlusSignIcon} size={14} />
                Add different address
              </button>
            )}
          </section>

          {/* Shipping Method */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Shipping Method</h2>
            <div className="space-y-3">
              {shippingMethods.map((method) => (
                <RadioCard
                  key={method.id}
                  name="shipping"
                  checked={shippingId === method.id}
                  onChange={() => setShippingId(method.id)}
                  trailing={method.price === 0 ? 'Free' : `₹ ${method.price}`}
                >
                  <span className="font-medium text-ink">{method.label}</span>
                  <span className="block text-sm text-gray-500">{method.eta}</span>
                </RadioCard>
              ))}
            </div>
          </section>

          {/* Gift Card */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Gift Card & Store Credit</h2>
            <div className="flex gap-3">
              <input
                value={giftCode}
                onChange={(e) => {
                  setGiftCode(e.target.value);
                  setGiftMessage('');
                }}
                placeholder="Gift card code"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
              />
              <button
                type="button"
                onClick={handleApplyGiftCode}
                className="px-6 rounded-lg border border-ink text-sm font-semibold text-ink hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {giftMessage && <p className="text-sm text-red-600 mt-2">{giftMessage}</p>}
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <RadioCard
                  key={method.id}
                  name="payment"
                  checked={paymentId === method.id}
                  onChange={() => setPaymentId(method.id)}
                >
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={method.id === 'cod' ? Cash01Icon : CreditCardIcon}
                      size={18}
                      className="text-ink shrink-0"
                    />
                    <span className="font-medium text-ink">{method.label}</span>
                  </span>
                  <span className="block text-sm text-gray-500 mt-0.5">{method.description}</span>
                </RadioCard>
              ))}
            </div>
          </section>

          {/* Place order — mobile / narrow layout */}
          <button
            type="submit"
            className="lg:hidden flex items-center justify-center w-full py-4 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Place Order &middot; ₹ {total.toLocaleString('en-IN')}
          </button>
        </div>

        {/* Right: summary */}
        <div className="lg:sticky lg:top-24 self-start space-y-4">
          <CheckoutSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
          <button
            type="submit"
            className="hidden lg:flex items-center justify-center w-full py-4 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Place Order &middot; ₹ {total.toLocaleString('en-IN')}
          </button>
        </div>
      </div>
    </form>
  );
}
