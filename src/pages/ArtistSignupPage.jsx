import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Store01Icon,
  ViewIcon,
  ViewOffIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';

function PasswordField({ label, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          minLength={8}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-ink cursor-pointer"
        >
          <HugeiconsIcon icon={visible ? ViewOffIcon : ViewIcon} size={18} />
        </button>
      </div>
    </div>
  );
}

export default function ArtistSignupPage() {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={56} className="text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-2">
          Your shop is on its way
        </h1>
        <p className="text-gray-500 mb-8">
          We've sent a confirmation to <span className="font-medium text-ink">{email}</span>. Finish
          setting up <span className="font-medium text-ink">{shopName}</span> from your seller
          dashboard.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-brand/10 text-brand mb-4">
          <HugeiconsIcon icon={Store01Icon} size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink">Artist Signup</h1>
        <p className="text-sm text-gray-500 mt-2">
          Open your own shop and start selling your handmade work on Artisan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Username / Shop Name</label>
          <input
            required
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="e.g. WillowAndOak"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1.5">Phone Number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors"
          />
        </div>

        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />

        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="flex items-center justify-center w-full py-3.5 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Create your Shop
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have a shop?{' '}
        <Link to="/login" className="font-semibold text-ink hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
