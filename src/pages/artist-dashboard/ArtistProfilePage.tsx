import { useState, type InputHTMLAttributes } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, SnapchatIcon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: IconSvgElement;
}

function Field({ label, icon, className = '', ...props }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <HugeiconsIcon
            icon={icon}
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          className={`w-full rounded-lg border border-gray-300 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-ink mb-5">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export default function ArtistProfilePage() {
  const [name, setName] = useState('Connor');
  const [username, setUsername] = useState('wonkystitching');
  const [email, setEmail] = useState('connor@wonkystitching.com');
  const [phone, setPhone] = useState('9876543210');

  const [houseNo, setHouseNo] = useState('297 C');
  const [addressLine1, setAddressLine1] = useState('Guru Nanak Nagar, Vill Gill');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('Ludhiana');
  const [pincode, setPincode] = useState('141116');
  const [state, setState] = useState('Punjab');

  const [bio, setBio] = useState('Hand embroidered custom tees, made to order in the UK.');

  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [snapchat, setSnapchat] = useState('');

  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber !== confirmAccountNumber) {
      setError('Account number and confirmation do not match.');
      setSaved(false);
      return;
    }
    setError('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif font-medium text-ink mb-6">Profile</h1>

      <form onSubmit={handleSave} className="max-w-2xl space-y-6">
        <Section title="Basic Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Field label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </Section>

        <Section title="Address">
          <Field
            label="House No."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            placeholder="e.g. 297 C"
          />
          <Field
            label="Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Street, locality, village"
          />
          <Field
            label="Address Line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Landmark (optional)"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <Field label="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} inputMode="numeric" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="State" value={state} onChange={(e) => setState(e.target.value)} />
            <Field label="Country" value="India" disabled />
          </div>
        </Section>

        <Section title="Bio">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell buyers a little about you and your shop..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors resize-none"
          />
        </Section>

        <Section title="Social Links">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Instagram"
              icon={InstagramIcon}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="username"
            />
            <Field
              label="Facebook"
              icon={FacebookIcon}
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="username"
            />
            <Field
              label="YouTube"
              icon={YoutubeIcon}
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="channel name"
            />
            <Field
              label="Snapchat"
              icon={SnapchatIcon}
              value={snapchat}
              onChange={(e) => setSnapchat(e.target.value)}
              placeholder="username"
            />
          </div>
        </Section>

        <Section title="Bank Account Details">
          <Field
            label="Account Holder"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            placeholder="Name as per bank records"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              inputMode="numeric"
            />
            <Field
              label="Confirm Account Number"
              value={confirmAccountNumber}
              onChange={(e) => setConfirmAccountNumber(e.target.value)}
              inputMode="numeric"
            />
          </div>
          <Field
            label="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            placeholder="e.g. HDFC0001234"
          />
        </Section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-ink hover:bg-black text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
          {saved && <span className="text-sm text-green-600 font-medium">Saved!</span>}
          {error && <span className="text-sm text-red-600 font-medium">{error}</span>}
        </div>
      </form>
    </div>
  );
}
